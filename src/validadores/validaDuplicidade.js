import { contratoValidacoesComErro, contratoValidacoesSemErro } from "../contratos/validacoes.js";
import { retornaMensagemContatoExistente } from "../mensagens/mensagensValidacao.js";

export function validaDuplicidade(input, lista) {

    const resultadoBusca = {
        dado: lista.some(usuario => usuario.contato[input.campo] === input.valor)
    };

    if (resultadoBusca.dado) {
        return contratoValidacoesComErro(input.campo, input.valor, retornaMensagemContatoExistente(input.campo));
    } else {
        return contratoValidacoesSemErro(input.campo, input.valor);
    };

};