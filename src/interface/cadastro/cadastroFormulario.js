import { salvarContato } from "../../servicos/agendaService.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";

export function enviarFormulario(dados) {
    const resultado = salvarContato(dados);
    modalContatoSalvo(resultado.mensagem);
};
