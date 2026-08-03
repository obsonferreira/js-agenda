import { editarContato } from "../../repositorio/agendaRepositorio.js";
import { validacaoGeral } from "../../validadores/compartilhado.js";

export function editarFormulario(dados) {
    editarContato(dados.pessoa, dados.referencia);
};

export function verificaEdicao(dados,referencia) {

    const resultado = {};
    for (const chave in dados.contato) {
        console.log(dados.contato[chave]);
        
        
        if (dados.contato[chave] === referencia) {
            resultado[chave] = { campo: chave, valor: dados.contato[chave], erro: false, mensagem: "" }
            };

    };
    
    resultado.caposEditados = validacaoGeral(resultado)

    return resultado;
};