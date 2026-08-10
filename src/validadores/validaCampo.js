import { contratoValidacoesComErro, contratoValidacoesSemErro } from "../contratos/validacoes.js";
import { retornaMensagemCampoObrigatorio, retornaMensagemTamanhoMaximo } from "../mensagens/mensagensValidacao.js";
import { retornaComposicaoInput } from "./analisaTexto.js";

export function validaEntrada(dados) {
    const componentes = retornaComposicaoInput(dados.valor);
    const tamanhoMaximo = (dados) => {
        if (dados.campo === 'telefone') {
            return 9;
        } else if (dados.campo === 'email') {
            return 40;
        } else {
            return 20;
        };
    };

    if (componentes.quantidadeEspaco === componentes.tamanhoInput) {
        return contratoValidacoesComErro(dados.campo, dados.valor, retornaMensagemCampoObrigatorio(dados.campo));
    } else if (componentes.tamanhoInput > tamanhoMaximo(dados)) {
        return contratoValidacoesComErro(dados.campo, dados.valor, retornaMensagemTamanhoMaximo(dados.campo, tamanhoMaximo(dados)));
    } else {
        return contratoValidacoesSemErro(dados.campo,dados.valor);
    };
};