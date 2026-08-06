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
        return {
            campo: dados.campo,
            valor: dados.valor,
            erro: true,
            mensagem: retornaMensagemCampoObrigatorio(dados.campo)
        };

    } else if (componentes.tamanhoInput > tamanhoMaximo(dados)) {
        return {
            campo: dados.campo,
            valor: dados.valor,
            erro: true,
            mensagem: retornaMensagemTamanhoMaximo(dados.campo, tamanhoMaximo(dados))
        };
    } else {
        return {
            campo: dados.campo,
            valor: dados.valor,
            erro: false,
            mensagem: ``
        };
    };
};