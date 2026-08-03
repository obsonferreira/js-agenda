import { exibirMensagem, ocultarAtributo, exibirAtributo } from "../compartilhado/notificacoes.js";
import { criarPessoa } from "../../servicos/agendaService.js";
import { validaPessoa } from "../../validadores/validaPessoa.js";
import { validaEntrada } from "../../validadores/validaCampo.js";
import { validacaoGeral } from './../../validadores/compartilhado.js';
import { elementoAlerta } from "../cadastro/elementosCadastro.js";
import { validaDuplicidade } from "../../validadores/validaDuplicidade.js";
import { buscaDuplicidade } from "../../repositorio/agendaRepositorio.js";

export function exibirErrosValidacao(validacao, elementoAlerta) {

    for (const chave in validacao) {
        const valorInvalido = (chave === "dadosInvalidos");
        if (!valorInvalido) {
            if (validacao[chave].erro) {
                exibirErrosCampos(validacao[chave], elementoAlerta);
            };
        };
    };
};

export function ocultaErrosValidacao(elementoAlerta) {

    for (const chave in elementoAlerta) {

        if (elementoAlerta[chave]) {
            ocultarAtributo(elementoAlerta[chave]);
        };
    };
};

export function exibirErrosCampos(dados, elementoAlerta) {

    exibirAtributo(elementoAlerta[dados.campo]);
    exibirMensagem(elementoAlerta[dados.campo], dados.mensagem);

};

export function desbloquearBotao(validacao, elemento) {

    if (validacao) {
        elemento.submit.disabled = false;
    } else {
        elemento.submit.disabled = true;
    };
};

export function bloquearBotao(elemento) {

    elemento.submit.disabled = true;
};

export function processaFormulario(elemento) {

    const formData = new FormData(elemento.formulario);
    const dadosObjeto = Object.fromEntries(formData.entries());
    return criarPessoa(dadosObjeto);
};

export function validaFormulario(pessoa) {

    return validaPessoa(pessoa);
};

export function validaDuplicidadeFormulario(contato) {
    const resultado = buscaDuplicidade(contato);
    resultado.dadosInvalidos = validacaoGeral(resultado)
    return resultado;

};

export function validaCamposObrigatorio(dadosFormulario) {

    const dados = {
        nome: validaEntrada(dadosFormulario['nome']),
        telefone: validaEntrada(dadosFormulario['telefone']),
        email: validaEntrada(dadosFormulario['email'])
    };
    dados.dadosInvalidos = validacaoGeral(dados);
    return dados;
};