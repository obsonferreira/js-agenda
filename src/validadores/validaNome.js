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
            mensagem: `Campo não pode ter espaço, verifique o campo novamente!`
        };

    } else if (validacao.caracteresInvalidos) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: `Campo contem: "${validacao.caracteres}", ${(validacao.caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}!`
        };

    } else if (validacao.tamanho) {

        resultado = {
            campo: campo,
            valor: inputMinusculo,
            erro: true,
            mensagem: "Campo curto, campo deve ter minimo 3 letras!"
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
        tamanho: composicao.letras.length < 3,
        caracteresInvalidos: (composicao.caracteresEspecial.length > 0 || composicao.numero.length > 0),
        caracteres: composicao.numero + composicao.caracteresEspecial
    };
};



