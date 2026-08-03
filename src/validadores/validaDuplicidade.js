import { validacaoGeral } from "./compartilhado.js";

export function validaDuplicidade(input, lista) {
    
    const resultado = {};
    const resultadoBusca = {
        telefone: lista.some(usuario => usuario.contato.telefone === input.contato.telefone),
        email: lista.some(usuario => usuario.contato.email === input.contato.email)
    };

    if (resultadoBusca.telefone) {
        resultado.telefone = { campo: 'telefone', valor: input.contato.telefone, id: lista.find(usuario => usuario.contato.telefone === input.contato.telefone).id, erro: resultadoBusca.telefone, mensagem: "telefone existente!" };
    } else {
        resultado.telefone = { campo: 'telefone', valor: '', id: '', erro: resultadoBusca.telefone, mensagem: "" };
    };

    if (resultadoBusca.email) {
        resultado.email = { campo: 'email', valor: input.contato.email, id: lista.find(usuario => usuario.contato.email === input.contato.email).id, erro: resultadoBusca.email, mensagem: "email existente!" };
    } else {
        resultado.email = { campo: 'email', valor: '', id: '', erro: resultadoBusca.email, mensagem: "" };
    };
    resultado.dadosInvalidos = validacaoGeral(resultado);

    return resultado;

};