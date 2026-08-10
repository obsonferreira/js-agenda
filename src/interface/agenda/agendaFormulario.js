import { editarContato } from "../../repositorio/agendaRepositorio.js";

export function editarFormulario(dados) {
    editarContato(dados.pessoa, dados.referencia);
};

export function verificaEdicao(dados, referencia) {

    const resultado = {};
    for (const chave in dados.contato) {

        if (dados.contato[chave] !== referencia.contato[chave]) {
            resultado[chave] = { campo: chave, valor: dados.contato[chave], erro: false, mensagem: "" };
        } else {
            resultado[chave] = { campo: chave, valor: dados.contato[chave], erro: true, mensagem: "" };
        };
    };

    return resultado;
};