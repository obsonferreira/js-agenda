import { elementoDialogoAlertasAgenda, elementoAlertaAgenda, elementoDialogoEdicao } from "../agenda/elementosAgenda.js";
import { elementoDialogo, elementoAlerta } from "../cadastro/elementosCadastro.js";
import { ocultarAtributo, exibirMensagem, exibirAtributo } from "./notificacoes.js";

export function modalContatoSalvo(mensagem) {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.contatoSalvo,mensagem);
};

export function mensagemContatoAlterado() {
    elementoDialogoEdicao.modalEdicao.close();
    exibirAtributo(elementoDialogoAlertasAgenda.mensagemAlteracao);
    elementoDialogoAlertasAgenda.modalAlertas.showModal();
};
