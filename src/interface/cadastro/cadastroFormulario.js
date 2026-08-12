import { salvarContato } from "../../servicos/agendaService.js";
import { modalContatoSalvo } from "../compartilhado/dialog.js";

export function enviarFormulario(dados) {
    const resultado = salvarContato(dados);
    console.log(resultado);
    
    modalContatoSalvo(resultado.mensagem);
};
