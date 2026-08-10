import { contratoValidacoesComErro, contratoValidacoesSemErro } from "../../contratos/validacoes.js";
import { editarContato } from "../../repositorio/agendaRepositorio.js";

export function editarFormulario(dados) {
    editarContato(dados.pessoa, dados.referencia);
};

export function verificaEdicao(dados, referencia) {

    const resultado = {};
    for (const chave in dados.contato) {

        if (dados.contato[chave] !== referencia.contato[chave]) {
            resultado[chave] = contratoValidacoesSemErro(chave, dados.contato[chave]);
        } else {
            resultado[chave] = contratoValidacoesComErro(chave,dados.contato[chave],"");
        };
    };

    return resultado;
};