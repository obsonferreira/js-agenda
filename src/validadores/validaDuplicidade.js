import { retornaMensagemContatoExistente } from "../mensagens/mensagensValidacao.js";

export function validaDuplicidade(input, lista) {

    const resultadoBusca = {
        dado: lista.some(usuario => usuario.contato[input.campo] === input.valor)
    };

    if (resultadoBusca.dado) {
        return {
            campo: input.campo,
            valor: input.valor,
            erro: resultadoBusca.dado,
            mensagem: retornaMensagemContatoExistente(input.campo)
        };
    } else {
        return {
            campo: input.campo,
            valor: input.valor,
            erro: resultadoBusca.dado,
            mensagem: ""
        };
    };
};