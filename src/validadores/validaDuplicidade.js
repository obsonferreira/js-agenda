export function validaDuplicidade(input, lista) {

    const resultadoBusca = {
        dado: lista.some(usuario => usuario.contato[input.campo] === input.valor)
    };

    if (resultadoBusca.dado) {
        return {
            campo: input.campo,
            valor: input.valor,
            id: lista.find(usuario => usuario.contato[input.campo] === input.valor).id,
            erro: resultadoBusca.dado,
            mensagem: `${input.campo} já cadastrado.`
        };
    } else {
        return {
            campo: input.campo,
            valor: input.valor,
            id: '',
            erro: resultadoBusca.dado,
            mensagem: ""
        };
    };
};