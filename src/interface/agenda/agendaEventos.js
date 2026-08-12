import { ocultarAtributo, exibirAtributo, exibirMensagem } from "./../compartilhado/notificacoes.js";
import { exibirErrosValidacao, processaFormulario, validaDuplicidadeFormulario, validaFormulario } from "./../compartilhado/formulario.js";
import { bloquearBotao, desbloquearBotao, validaCamposObrigatorio, ocultaErrosValidacao } from "./../compartilhado/formulario.js";
import { elementoTabelaAgenda, elementoDialogoAlertasAgenda, elementoBuscaAgenda } from "./elementosAgenda.js";
import { elementoVisorAgenda, elementoAlertaAgenda, elementoDialogoEdicao, elementoFormularioAgenda } from "./elementosAgenda.js";
import { editarFormulario, verificaEdicao } from "./agendaFormulario.js";
import { buscarContato, deletarContato, retornaLista } from "../../repositorio/agendaRepositorio.js";
import { preencheFormulario, criarTabelaContato, retornaDadosTabela } from "./agendaTabela.js";
import { alertaBuscaContato } from "./agendaBusca.js";
import { mensagemContatoAlterado } from "../compartilhado/dialog.js";

let referencia;
let dadosEdicao;

function iniciarAgenda() {
    const lista = retornaLista();

    document.addEventListener("DOMContentLoaded", () => {
        let quantidadeContatos = lista.length;

        elementoVisorAgenda.contador.textContent = `${quantidadeContatos <= 1 ? "Contato salvo" : "Contatos salvos"}: ${quantidadeContatos}`;

        if (quantidadeContatos === 0) {
            exibirAtributo(elementoAlertaAgenda.contato);
            exibirMensagem(elementoAlertaAgenda.contato, "Nenhum contato cadastrado.");
        } else {
            ocultarAtributo(elementoAlertaAgenda.contato);
            const tabela = criarTabelaContato(lista);
            elementoTabelaAgenda.tabela.appendChild(tabela);
        };
    });
};

function iniciarEdicao() {
    elementoFormularioAgenda.formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const pessoa = processaFormulario(elementoFormularioAgenda);
        const formularioNaoEditado = verificaEdicao(pessoa, dadosEdicao);
        const validacao = validaFormulario(pessoa);
        const duplicidade = validaDuplicidadeFormulario(formularioNaoEditado);

        const dadosFormulario = {
            pessoa: pessoa,
            validacao: validacao,
            duplicidade: duplicidade,
            referencia: referencia
        };

        if (validacao.dadosInvalidos) {
            exibirErrosValidacao(validacao, elementoAlertaAgenda);
        } else if (duplicidade.dadosInvalidos) {
            exibirErrosValidacao(duplicidade, elementoAlertaAgenda);
        };

        if (!validacao.dadosInvalidos && !duplicidade.dadosInvalidos) {
            editarFormulario(dadosFormulario);
            mensagemContatoAlterado();
        };
    });
};

function editarContatoAgenda() {
    elementoTabelaAgenda.tabela.addEventListener("click", (event) => {
        event.preventDefault();
        const click = event.target;
        if (click.tagName === 'BUTTON') {
            const linhaTabela = click.closest('tr');
            const dadosTabela = retornaDadosTabela(linhaTabela);
            const id = Number(linhaTabela.dataset.id);
            dadosEdicao = dadosTabela;
            referencia = id;
            preencheFormulario(elementoFormularioAgenda.formulario, referencia);
        };
    });
};

function validaCamposFormulario() {

    elementoFormularioAgenda.formulario.addEventListener('input', (evento) => {
        const campoEdicao = evento.target;
        const campos = validaCamposObrigatorio(elementoFormularioAgenda.formulario);

        if (campoEdicao.name) {
            ocultaErrosValidacao(campoEdicao.name, elementoAlertaAgenda)
        };
        if (campos.dadosInvalidos) {
            exibirErrosValidacao(campos, elementoAlertaAgenda);
        };
        desbloquearBotao(!campos.dadosInvalidos, elementoFormularioAgenda);
    });
};

function sairEdicaoFeita() {
    elementoDialogoAlertasAgenda.botaoSairAlteracao.addEventListener("click", () => {
        elementoDialogoAlertasAgenda.modalAlertas.close();
        location.reload();
    });
};

function sairExclusaoFeita() {
    elementoDialogoAlertasAgenda.botaoSairExclusao.addEventListener("click", () => {
        location.reload();
    });
};

function confirmarExclusao() {
    elementoDialogoAlertasAgenda.botaoSim.addEventListener("click", () => {
        ocultarAtributo(elementoDialogoAlertasAgenda.selecaoExclusao);
        deletarContato(referencia);
        exibirAtributo(elementoDialogoAlertasAgenda.mensagemExclusao);
    });
};

function cancelarExclusao() {
    elementoDialogoAlertasAgenda.botaoNao.addEventListener("click", () => {
        ocultarAtributo(elementoDialogoAlertasAgenda.mensagemExclusao);
        elementoDialogoEdicao.modalEdicao.showModal();
        elementoDialogoAlertasAgenda.modalAlertas.close();
    });
};

function excluirContatoAgenda() {

    elementoDialogoEdicao.botaoExcluir.addEventListener("click", () => {
        exibirAtributo(elementoDialogoAlertasAgenda.selecaoExclusao);
        elementoDialogoEdicao.modalEdicao.close();
        elementoDialogoAlertasAgenda.modalAlertas.showModal();
    });
};

function cancelarAlteracao() {
    elementoDialogoEdicao.botaoSair.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.close();
    });
};

function eventoBuscarContato() {
    elementoBuscaAgenda.botaoBusca.addEventListener("click", () => {
        const input = elementoBuscaAgenda.inputBusca.value;
        if (input.length <= 0) {
            const alertaBusca = alertaBuscaContato();
            elementoBuscaAgenda.divBusca.appendChild(alertaBusca);
        } else {
            const resultado = buscarContato(input);
        };
    });
};

export function mainAgenda() {
    iniciarAgenda();
    iniciarEdicao();
    editarContatoAgenda();
    validaCamposFormulario();
    cancelarAlteracao();
    sairEdicaoFeita()

    excluirContatoAgenda();
    confirmarExclusao();
    sairExclusaoFeita();
    cancelarExclusao();

    eventoBuscarContato();
};