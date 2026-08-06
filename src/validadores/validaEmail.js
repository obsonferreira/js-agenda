import { retornaMensagemArrobaExtra, retornaMensagemCaracterConsecutivos, retornaMensagemCaracterInvalido, retornaMensagemComplementoDominio, retornaMensagemDominio, retornaMensagemEspaco, retornaMensagemFinalInvalido, retornaMensagemInicioInvalido, retornaMensagemPontoExtraDominio, retornaMensagemSemArroba, retornaMensagemSemPonto, retornaMensagemTamanhoMaximo, retornaMensagemTamanhoMinimo } from "../mensagens/mensagensValidacao.js";
import { retornaComposicaoEmail } from "./analisaTexto.js";

export function validaEmail(input, campo) {
    let resultado = {};
    const componentes = retornaComposicaoEmail(input);
    const validacao = validaInputEmail(componentes);

    if (validacao.quantidadeEspaco) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemEspaco(campo)
        };

    } else if (validacao.tamanhoMinimo) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemTamanhoMinimo(campo, 9)
        };

    } else if (validacao.tamanhoMaximo) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemTamanhoMaximo(campo, 40)
        };

    } else if (validacao.semArroba) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemSemArroba(campo)
        };

    } else if (validacao.arrobaExtra) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemArrobaExtra(campo)
        };

    } else if (validacao.caracteresInvalidosIdEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemCaracterInvalido(campo, componentes.caracteresInvalidosIdEmail)
        };

    } else if (validacao.caracteresInvalidosDominioEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemCaracterInvalido(campo, componentes.caracteresInvalidosDominioEmail)
        };

    } else if (validacao.semPontoDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemSemPonto(campo)
        };

    } else if (validacao.nomeDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemDominio()
        };

    } else if (validacao.complementoDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemComplementoDominio(campo)
        };

    } else if (validacao.pontoExtraDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemPontoExtraDominio(campo)
        };

    } else if (validacao.inicioInvalido) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemInicioInvalido(campo, componentes.primeiroDigitoEmail)
        };

    } else if (validacao.finalInvalido) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemFinalInvalido(campo, componentes.ultimoDigitoEmail)
        };

    } else if (validacao.caracterConsecutivosDominioEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemCaracterConsecutivos(campo, componentes.caracterConsecutivosDominioEmail)
        };

    } else if (validacao.caracterConsecutivosIdEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: retornaMensagemCaracterConsecutivos(campo, componentes.caracterConsecutivosIdEmail)
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
