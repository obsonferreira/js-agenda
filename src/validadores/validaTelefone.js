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
            mensagem: `Telefone não pode ter espaço, verifique o telefone digitado!`
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `Telefone contem: "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`
        };

    } else if (validacao.tamanhoMenor) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: "Telefone faltando digitos, digite os 9 digitos!"
        };

    } else if (validacao.tamanhoMaior) {

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
        tamanhoMenor: composicao.numero.length < 9,
        tamanhoMaior: composicao.numero.length > 9,
        caracteresInvalidos: composicao.caracteresEspecial.length > 0 || composicao.letras.length > 0 ,
        caracteres: composicao.letras + composicao.caracteresEspecial
    };
};