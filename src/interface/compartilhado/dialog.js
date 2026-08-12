import { elementoDialogoAlertasAgenda, elementoAlertaAgenda, elementoDialogoEdicao } from "../agenda/elementosAgenda.js";
import { elementoDialogo } from "../cadastro/elementosCadastro.js";
import { exibirMensagem, exibirAtributo } from "./notificacoes.js";

export function modalResultadoCadastro(mensagem) {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.resultadoCadastro, mensagem);
};

export function mensagemContatoAlterado() {
    elementoDialogoEdicao.modalEdicao.close();
    exibirAtributo(elementoDialogoAlertasAgenda.mensagemAlteracao);
    elementoDialogoAlertasAgenda.modalAlertas.showModal();
};
