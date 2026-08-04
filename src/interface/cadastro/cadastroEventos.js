import { elementoAlerta, elementoBotoes, elementoCadastro, elementoDialogo } from "./elementosCadastro.js";
import { validaFormulario, bloquearBotao, desbloquearBotao, validaCamposObrigatorio, processaFormulario, exibirErrosValidacao, validaDuplicidadeFormulario, ocultaErrosValidacao } from "../compartilhado/formulario.js";
import { enviarFormulario } from "./cadastroFormulario.js";
import { Pessoa } from "../../modelos/pessoa.js";


function iniciarCadastro() {
    elementoCadastro.formulario.addEventListener("submit", (event) => {
        bloquearBotao(elementoBotoes);
        event.preventDefault();
        const pessoa = processaFormulario(elementoCadastro);

        const validacao = validaFormulario(pessoa);
        const duplicidade = validaDuplicidadeFormulario(validacao);
        const dadosFormulario = {
            pessoa: pessoa,
            validacao: validacao,
            duplicidade: duplicidade
        };

        if (dadosFormulario.validacao.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.validacao, elementoAlerta);
        } else if (dadosFormulario.duplicidade.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.duplicidade, elementoAlerta);
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
    elementoCadastro.formulario.addEventListener('input', (evento) => {
        const campoEdicao = evento.target;

        if (campoEdicao.name) {
            ocultaErrosValidacao(campoEdicao.name, elementoAlerta)
        };
        const campos = validaCamposObrigatorio(elementoCadastro.formulario);
        desbloquearBotao(!campos.dadosInvalidos, elementoBotoes);
        if (campos.dadosInvalidos) {
            exibirErrosValidacao(campos, elementoAlerta);
        };
    });
};

export function main() {
    iniciarCadastro();
    validaCamposFormulario();
    sairMensagem();
}

