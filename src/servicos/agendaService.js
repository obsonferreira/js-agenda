import { contratoOperacaoComFalha, contratoOperacaoSemFalha } from "../contratos/operacoes.js";
import { contratoValidacoesSemErro } from "../contratos/validacoes.js";
import { mensagemContatoInvalido, mensagemCriacaoContato, mensagemErroContato } from "../mensagens/mensagensOperacao.js";
import { Contato } from "../modelos/contato.js";
import { Pessoa } from "../modelos/pessoa.js";
import { retornaLista, salvar } from "../repositorio/agendaRepositorio.js";
import { validaDuplicidade } from "../validadores/validaDuplicidade.js";

export function criarPessoa(dadosObjeto) {

    const contato = new Contato(dadosObjeto.telefone, dadosObjeto.email);
    const pessoa = new Pessoa(dadosObjeto.nome, dadosObjeto.sobrenome, contato);

    return pessoa;
};

export function buscaDuplicidade(contato) {
    const resultado = {};
    if (!contato.email.erro) {
        resultado.email = validaDuplicidade(contato.email, retornaLista());
    } else {
        resultado.email = contratoValidacoesSemErro(contato.email.campo, contato.email.valor);
    };

    if (!contato.telefone.erro) {
        resultado.telefone = validaDuplicidade(contato.telefone, retornaLista());
    } else {
        resultado.telefone = contratoValidacoesSemErro(contato.telefone.campo, contato.telefone.valor);
    };
    return resultado;
};

export function salvarContato(dados) {
    if (dados.duplicidade.dadosInvalidos || dados.validacao.dadosInvalidos) {
        return contratoOperacaoComFalha("contato-invalido",mensagemContatoInvalido());
    } else {
        const sucesso = salvar(dados.pessoa); 
        if (!sucesso) {
            return contratoOperacaoComFalha('erro-ao-processar-contato',mensagemErroContato());
        };
        return contratoOperacaoSemFalha(dados.pessoa,mensagemCriacaoContato());
        
    };
};

// export function editarContato(dados, referencia) {

// };