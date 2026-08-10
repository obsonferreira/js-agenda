import { contratoValidacoesComErro, contratoValidacoesSemErro } from "../contratos/validacoes.js";
import { retornaMensagemArrobaExtra, retornaMensagemCaracterConsecutivos, retornaMensagemCaracterInvalido, retornaMensagemComplementoDominio, retornaMensagemDominio, retornaMensagemEspaco, retornaMensagemFinalInvalido, retornaMensagemInicioInvalido, retornaMensagemPontoExtraDominio, retornaMensagemSemArroba, retornaMensagemSemPonto, retornaMensagemTamanhoMaximo, retornaMensagemTamanhoMinimo } from "../mensagens/mensagensValidacao.js";
import { retornaComposicaoEmail } from "./analisaTexto.js";

export function validaEmail(input, campo) {
    let resultado = {};
    const componentes = retornaComposicaoEmail(input);
    const validacao = validaInputEmail(componentes);

    if (validacao.quantidadeEspaco) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemEspaco(campo));
    } else if (validacao.tamanhoMinimo) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemTamanhoMinimo(campo, 9));
    } else if (validacao.tamanhoMaximo) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemTamanhoMaximo(campo, 40));
    } else if (validacao.semArroba) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemSemArroba(campo));
    } else if (validacao.arrobaExtra) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemArrobaExtra(campo));
    } else if (validacao.caracteresInvalidosIdEmail) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemCaracterInvalido(campo, componentes.caracteresInvalidosIdEmail));
    } else if (validacao.caracteresInvalidosDominioEmail) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemCaracterInvalido(campo, componentes.caracteresInvalidosDominioEmail));
    } else if (validacao.semPontoDominio) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemSemPonto(campo));
    } else if (validacao.nomeDominio) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemDominio());
    } else if (validacao.complementoDominio) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemComplementoDominio(campo));
    } else if (validacao.pontoExtraDominio) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemPontoExtraDominio(campo));
    } else if (validacao.inicioInvalido) {
        resultado = contratoValidacoesComErro(campo, input, retornaMensagemInicioInvalido(campo, componentes.primeiroDigitoEmail));
    } else if (validacao.finalInvalido) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemFinalInvalido(campo, componentes.ultimoDigitoEmail));
    } else if (validacao.caracterConsecutivosDominioEmail) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemCaracterConsecutivos(campo, componentes.caracterConsecutivosDominioEmail));
    } else if (validacao.caracterConsecutivosIdEmail) {
        resultado = contratoValidacoesComErro(campo, input,retornaMensagemCaracterConsecutivos(campo, componentes.caracterConsecutivosIdEmail));
    } else {
        resultado = contratoValidacoesSemErro(campo, input);
    };
    return resultado;
};

function validaInputEmail(componentes) {

    const caracteresEspecial = /^[\W_]$/;
    return {
        quantidadeEspaco: componentes.quantidadeEspaco > 0,
        tamanhoMinimo: componentes.tamanhoInput < 9,
        tamanhoMaximo: componentes.tamanhoInput > 40,
        semArroba: componentes.caracterValidoEmail.length === 0,
        arrobaExtra: componentes.caracterValidoEmail.length > 1,

        caracteresInvalidosIdEmail: componentes.caracteresInvalidosIdEmail.length > 0,
        caracterConsecutivosIdEmail: componentes.caracterConsecutivosIdEmail.length > 0,
        nomeDominio: componentes.nomeDominio.length <= 1,
        complementoDominio: componentes.complementoDominio.length <= 1,

        inicioInvalido: caracteresEspecial.test(componentes.primeiroDigitoEmail),
        finalInvalido: caracteresEspecial.test(componentes.ultimoDigitoEmail),

        caracterConsecutivosDominioEmail: componentes.caracterConsecutivosDominioEmail.length > 0,
        caracteresInvalidosDominioEmail: componentes.caracteresInvalidosDominioEmail.length > 0,
        pontoExtraDominio: componentes.caracterValidosDominioEmail.length > 2,
        semPontoDominio: componentes.caracterValidosDominioEmail.length === 0
    };
};
