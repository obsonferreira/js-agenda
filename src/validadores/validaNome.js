import { retornaMensagemEspaco, retornaMensagemTamanhoMinimo, retornaMensagemCaracterInvalido, retornaMensagemTamanhoMaximo } from '../mensagens/mensagensValidacao.js';
import { retornaComposicaoInput } from './analisaTexto.js';

export function validaNome(input, campo) {
    let resultado = {};
    const inputMinusculo = input.toLowerCase();
    const componentes = retornaComposicaoInput(inputMinusculo);
    const validacao = validaInputNome(componentes);

    if (validacao.quantidadeEspaco) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: retornaMensagemEspaco(campo)
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: retornaMensagemCaracterInvalido(campo, validacao.caracteres)
        };

    } else if (validacao.tamanhoMinimo) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: retornaMensagemTamanhoMinimo(campo,3)
        };

    } else if (validacao.tamanhoMaximo) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: retornaMensagemTamanhoMaximo(campo, 20)
        };

    } else {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: false,
            mensagem: ""
        };
    };
    return resultado;
};

function validaInputNome(composicao) {

    return {
        quantidadeEspaco: composicao.quantidadeEspaco > 0,
        tamanhoMinimo: composicao.letras.length < 3,
        tamanhoMaximo: composicao.letras.length > 20,
        caracteresInvalidos: (composicao.caracteresEspecial.length > 0 || composicao.numero.length > 0),
        caracteres: composicao.numero + composicao.caracteresEspecial
    };
};



