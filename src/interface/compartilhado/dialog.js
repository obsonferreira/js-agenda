import { elementoDialogoAlertasAgenda, elementoAlertaAgenda } from "../agenda/elementosAgenda.js";
import { elementoDialogo } from "../cadastro/elementosCadastro.js";
import { exibirMensagem, exibirAtributo } from "./notificacoes.js";

export function modalResultadoCadastro(mensagem) {
    elementoDialogo.modalCadastro.showModal();
    exibirMensagem(elementoDialogo.resultadoCadastro, mensagem);
};

export function mensagemOperacoes(mensagem) {
    exibirAtributo(elementoDialogoAlertasAgenda.mensagemOperacoes);
    exibirMensagem(elementoAlertaAgenda.operacoes,mensagem);
};

export function ocultarDialogo(dialogo) {
    dialogo.close();
};

export function exibirDialogo(dialogo) {
    dialogo.showModal();
};
