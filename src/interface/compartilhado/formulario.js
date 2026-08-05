import { exibirMensagem, ocultarAtributo, exibirAtributo } from "../compartilhado/notificacoes.js";
import { criarPessoa } from "../../servicos/agendaService.js";
import { validaPessoa } from "../../validadores/validaPessoa.js";
import { validaEntrada } from "../../validadores/validaCampo.js";
import { validacaoGeral } from './../../validadores/compartilhado.js';
import { buscaDuplicidade } from "../../repositorio/agendaRepositorio.js";

export function exibirErrosValidacao(validacao, elementoAlerta) {
    if (validacao.nome) {
        analizaErrosValidacao(validacao.nome, elementoAlerta);
    };
    if (validacao.sobrenome) {
        analizaErrosValidacao(validacao.sobrenome, elementoAlerta);
    };
    if (validacao.telefone) {
        analizaErrosValidacao(validacao.telefone, elementoAlerta);
    };
    if (validacao.email) {
        analizaErrosValidacao(validacao.email, elementoAlerta);
    };
};

function analizaErrosValidacao(dados, elementoAlerta) {
    if (dados.erro) {
        exibirAtributo(elementoAlerta[dados.campo]);
        exibirMensagem(elementoAlerta[dados.campo], dados.mensagem);
    };
};

export function ocultaErrosValidacao(campo,elementoAlerta) {

    ocultarAtributo(elementoAlerta[campo]);
;
}

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