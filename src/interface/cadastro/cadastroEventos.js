import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { validaFormulario, bloquearBotao, desbloquearBotao, validaCamposObrigatorio, processaFormulario, exibirErrosCampos, exibirErrosValidacao, validaDuplicidadeFormulario, ocultaErrosValidacao } from "../compartilhado/formulario.js";
import { enviarFormulario } from "./cadastroFormulario.js";
import { Pessoa } from "../../modelos/pessoa.js";


function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const pessoa = processaFormulario(elementoCadastro);
        const dadosFormulario = {
            pessoa: pessoa,
            validacao: validaFormulario(pessoa),
            duplicidade: validaDuplicidadeFormulario(pessoa)
        };

        if (dadosFormulario.validacao.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.validacao, elementoAlerta);
        } else if (dadosFormulario.duplicidade.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.duplicidade, elementoAlerta);
        } else {
            ocultaErrosValidacao(elementoAlerta);
        };

        if (!dadosFormulario.validacao.dadosInvalidos && !dadosFormulario.duplicidade.dadosInvalidos) {
            enviarFormulario(dadosFormulario);
            elementoCadastro.formulario.reset();
        };

    });
};
function sairMensagem() {
    elementoDialogo.botaoFechar.addEventListener("click", () => {
        elementoDialogo.modalCadastro.close();
    });
};

function validaCamposFormulario() {

    bloquearBotao(elementoBotoes);
    elementoCadastro.formulario.addEventListener('input', () => {
        const campos = validaCamposObrigatorio(elementoCadastro.formulario);
        desbloquearBotao(!campos.dadosInvalidos, elementoBotoes);
        if (campos.dadosInvalidos) {
            exibirErrosValidacao(campos, elementoAlerta);
        } else {
            ocultaErrosValidacao(elementoAlerta);
        };

    });
};

export function main() {
    iniciarCadastro();
    validaCamposFormulario();
    sairMensagem();
}

