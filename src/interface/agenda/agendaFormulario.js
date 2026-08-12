import { contratoValidacoesComErro, contratoValidacoesSemErro } from "../../contratos/validacoes.js";
import { editarContato } from "../../servicos/agendaService.js";

export function editarFormulario(dados) {
    return editarContato(dados);
};

export function verificaEdicao(dados, referencia) {

    const resultado = {};
    for (const chave in dados.contato) {

        if (dados.contato[chave] !== referencia.contato[chave]) {
            resultado[chave] = contratoValidacoesSemErro(chave, dados.contato[chave]);
        } else {
            resultado[chave] = contratoValidacoesComErro(chave, dados.contato[chave], "");
        };
    };

    return resultado;
};