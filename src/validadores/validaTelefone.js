import { retornaMensagemCaracterInvalido, retornaMensagemEspaco, retornaMensagemTamanhoMinimo } from '../mensagens/mensagensValidacao.js';
import { retornaComposicaoInput } from './analisaTexto.js';

export function validaTelefone(input, campo) {
    let resultado = {};
    const composicao = retornaComposicaoInput(input);
    const validacao = validaInputFone(composicao);

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
            mensagem: "Telefone com muitos digitos, digite apenas 9 digitos!"
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

function validaInputFone(composicao) {

    return {
        quantidadeEspaco: composicao.quantidadeEspaco > 0,
        tamanhoMinimo: composicao.numero.length < 9,
        tamanhoMaximo: composicao.numero.length > 9,
        caracteresInvalidos: composicao.caracteresEspecial.length > 0 || composicao.letras.length > 0 ,
        caracteres: composicao.letras + composicao.caracteresEspecial
    };
};