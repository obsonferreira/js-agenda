import { retornaMensagemCaracterInvalido, retornaMensagemEspaco, retornaMensagemTamanhoMaximo, retornaMensagemTamanhoMinimo } from '../mensagens/mensagensValidacao.js';
import { retornaComposicaoInput } from './analisaTexto.js';

export function validaTelefone(input, campo) {
    let resultado = {};
    const componentes = retornaComposicaoInput(input);
    const validacao = validaInputFone componentes);

    if (validacao.quantidadeEspaco) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemEspaco(campo)
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemCaracterInvalido(campo,validacao.caracteres)
        };

    } else if (validacao.tamanhoMinimo) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemTamanhoMinimo(campo,9)
        };

    } else if (validacao.tamanhoMaximo) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemTamanhoMaximo(campo,9)
        };

    } else {
        resultado = {
            campo: campo,
            valor: input,
            erro: false,
            mensagem: ""
        };
    };

    return resultado;
};

function validaInputFone (componentes) {

    return {
        quantidadeEspaco: componentes.quantidadeEspaco > 0,
        tamanhoMinimo: componentes.numero.length < 9,
        tamanhoMaximo: componentes.numero.length > 9,
        caracteresInvalidos: componentes.caracteresEspecial.length > 0 || componentes.letras.length > 0 ,
        caracteres: componentes.letras + componentes.caracteresEspecial
    };
};