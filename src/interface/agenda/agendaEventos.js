import { ocultarAtributo, exibirAtributo, exibirMensagem } from "./../compartilhado/notificacoes.js";
import { exibirErrosValidacao, processaFormulario, validaDuplicidadeFormulario, validaFormulario } from "./../compartilhado/formulario.js";
import { bloquearBotao, desbloquearBotao, validaCamposObrigatorio, ocultaErrosValidacao } from "./../compartilhado/formulario.js";
import { elementoTabelaAgenda, elementoDialogoAlertasAgenda, elementoBuscaAgenda } from "./elementosAgenda.js";
import { elementoVisorAgenda, elementoAlertaAgenda, elementoDialogoEdicao, elementoFormularioAgenda } from "./elementosAgenda.js";
import { editarFormulario, verificaEdicao } from "./agendaFormulario.js";
import { deletarContato, retornaLista } from "../../repositorio/agendaRepositorio.js";
import { preencheFormulario, criarTabelaContato, retornaDadosTabela } from "./agendaTabela.js";
import { alertaBuscaContato } from "./agendaBusca.js";
import { buscaContato } from "../../repositorio/agendaRepositorio.js";
import { mensagemContatoAlterado } from "../compartilhado/dialog.js";

let referencia;
let dadosEdicao;

function iniciarAgenda() {
    const lista = retornaLista();

    document.addEventListener("DOMContentLoaded", () => {
        let quantidadeContatos = lista.length;

        elementoVisorAgenda.contador.textContent = `${quantidadeContatos > 0 ? "Contatos" : "Contato"} salvo: ${quantidadeContatos}`;

        if (quantidadeContatos === 0) {
            exibirAtributo(elementoAlertaAgenda.contato);
            exibirMensagem(elementoAlertaAgenda.contato, "Agenda vazia!");
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
        
        if (dadosFormulario.validacao.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.validacao, elementoAlertaAgenda);

        } else if (dadosFormulario.duplicidade.dadosInvalidos) {
            exibirErrosValidacao(dadosFormulario.duplicidade, elementoAlertaAgenda);
        };

        if (!dadosFormulario.validacao.dadosInvalidos && !dadosFormulario.duplicidade.dadosInvalidos) {
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
            dadosEdicao = dadosTabela;
            referencia = preencheFormulario(elementoFormularioAgenda.formulario, dadosTabela);
        };

    });
};

function validaCamposFormulario() {

    elementoFormularioAgenda.formulario.addEventListener('input', (evento) => {
        const campoEdicao = evento.target;

        if (campoEdicao.name) {
            ocultaErrosValidacao(campoEdicao.name, elementoAlertaAgenda)
        };
        const campos = validaCamposObrigatorio(elementoFormularioAgenda.formulario);
        desbloquearBotao(!campos.dadosInvalidos, elementoFormularioAgenda);
        if (campos.dadosInvalidos) {
            exibirErrosValidacao(campos, elementoAlertaAgenda);
        };

    });
};

function sairEdicaoFeita() {
    elementoDialogoAlertasAgenda.botaoSairAlteracao.addEventListener("click", () => {
        elementoDialogoAlertasAgenda.modalAlertas.close();
        location.reload();
    });
};

function cancelarAlteracao() {
    elementoDialogoEdicao.botaoSair.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.close();
    });
};

function excluirContatoAgenda() {

    elementoDialogoEdicao.botaoExcluir.addEventListener("click", () => {
        exibirAtributo(elementoDialogoAlertasAgenda.mensagemExclusao);
        elementoDialogoEdicao.modalEdicao.close();
        elementoDialogoAlertasAgenda.modalAlertas.showModal();
    });
};

function confirmarExclusao() {
    elementoDialogoAlertasAgenda.botaoSim.addEventListener("click", () => {
        deletarContato(referencia);
        location.reload();
    });
};

function cancelarExclusao() {
    elementoDialogoAlertasAgenda.botaoNao.addEventListener("click", () => {
        elementoDialogoEdicao.modalEdicao.showModal();
        elementoDialogoAlertasAgenda.modalAlertas.close();
    });
};

function buscarContato() {
    elementoBuscaAgenda.botaoBusca.addEventListener("click", () => {
        const input = elementoBuscaAgenda.inputBusca.value;
        if (input.length <= 0) {
            const alertaBusca = alertaBuscaContato();
            elementoBuscaAgenda.divBusca.appendChild(alertaBusca);
        } else {
            const resultado = buscaContato(input);
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
    cancelarExclusao();

    buscarContato();
};