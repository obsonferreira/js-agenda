import { contratoValidacoesComErro, contratoValidacoesSemErro } from '../contratos/validacoes.js';
import { retornaMensagemCaracterInvalido, retornaMensagemEspaco, retornaMensagemTamanhoMaximo, retornaMensagemTamanhoMinimo } from '../mensagens/mensagensValidacao.js';
import { retornaComposicaoInput } from './analisaTexto.js';

export function validaTelefone(input, campo) {
    let resultado = {};
    const componentes = retornaComposicaoInput(input);
    const validacao = validaInputFone (componentes);

    if (validacao.quantidadeEspaco) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemEspaco(campo));
    } else if (validacao.caracteresInvalidos) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemCaracterInvalido(campo,validacao.caracteres));
    } else if (validacao.tamanhoMinimo) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemTamanhoMinimo(campo,9));
    } else if (validacao.tamanhoMaximo) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemTamanhoMaximo(campo,9));
    } else {
        resultado = contratoValidacoesSemErro(campo, input);
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