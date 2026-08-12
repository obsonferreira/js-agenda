import { salvarContato } from "../../servicos/agendaService.js";

export function enviarFormulario(dados) {
    return salvarContato(dados);
};
