import { retornaMensagemCaracterInvalido, retornaMensagemEspaco, retornaMensagemTamanhoMaximo, retornaMensagemTamanhoMinimo } from "../mensagens/mensagensValidacao.js";
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

    } else if (validacao.nomeDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email falta nome do domínio ou faltando dígitos, verifique o email digitado!`
        };

    } else if (validacao.complementoDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email faltando ".com" ou similar, verifique o email digitado!`
        };

    } else if (validacao.arrobaExtra) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `Email com "@" excedente, verifique o email digitado!`
        };

    } else if (validacao.semArroba) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `Email sem "@", verifique o email digitado!`
        };

    } else if (validacao.pontoExtraDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `Email com "." excedente, verifique o email digitado!`
        };

    } else if (validacao.semPontoDominio) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `Email sem ".", verifique o email digitado!`
        };

    } else if (validacao.inicioInvalido) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email não pode iniciar com: "${componentes.primeiroDigitoEmail}", verifique o email digitado!`
        };

    } else if (validacao.finalInvalido) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email não pode terminar com: "${componentes.ultimoDigitoEmail}", verifique o email digitado!`
        };

    } else if (validacao.caracterConsecutivosDominioEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email não pode ter apos o "@", "${componentes.caracterConsecutivosDominioEmail}" consecutivos, verifique o email digitado!`
        };

    } else if (validacao.caracterConsecutivosIdEmail) {

        resultado = {
            campo: campo,
            valor: input,
            erro: true,
            mensagem: `O email não pode ter: "${componentes.caracterConsecutivosIdEmail}" consecutivos, verifique o email digitado!`
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

function validaInputEmail(inputUser) {

    const caracteresEspecial = /^[\W_]$/;

    return {
        quantidadeEspaco: inputUser.quantidadeEspaco > 0,
        tamanhoMinimo: inputUser.tamanhoInput < 9,
        tamanhoMaximo: inputUser.tamanhoInput > 40,
        semArroba: inputUser.caracterValidoEmail.length === 0,
        arrobaExtra: inputUser.caracterValidoEmail.length > 1,

        caracteresInvalidosIdEmail: inputUser.caracteresInvalidosIdEmail.length > 0,
        caracterConsecutivosIdEmail: inputUser.caracterConsecutivosIdEmail.length > 0,
        nomeDominio: inputUser.nomeDominio.length <= 1,
        complementoDominio: inputUser.complementoDominio.length <= 1,

        inicioInvalido: caracteresEspecial.test(inputUser.primeiroDigitoEmail),
        finalInvalido: caracteresEspecial.test(inputUser.ultimoDigitoEmail),

        caracterConsecutivosDominioEmail: inputUser.caracterConsecutivosDominioEmail.length > 0,
        caracteresInvalidosDominioEmail: inputUser.caracteresInvalidosDominioEmail.length > 0,
        pontoExtraDominio: inputUser.caracterValidosDominioEmail.length > 2,
        semPontoDominio: inputUser.caracterValidosDominioEmail.length === 0
    };
};
