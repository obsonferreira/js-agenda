import { salvarContato } from "../../repositorio/agendaRepositorio.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";

export function enviarFormulario(dados) {
    salvarContato(dados.pessoa);
    modalContatoSalvo();
};
