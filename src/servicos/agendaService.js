// aqui vou criar pessoa, validar pessoa, casdastrar contato
// editar contato e excluir contato

import { Contato } from "../modelos/contato.js";
import { Pessoa } from "../modelos/pessoa.js";

export function criarPessoa(dadosObjeto) {

    const contato = new Contato(dadosObjeto.telefone, dadosObjeto.email);
    const pessoa = new Pessoa(dadosObjeto.nome, dadosObjeto.sobrenome, contato);

    return pessoa;
};

export function atualizarPessoa(pessoa, dados){

    const novaPessoa = criarPessoa(pessoa)

    novaPessoa.atualizarNome(dados.nome);
    novaPessoa.atualizarSobrenome(dados.sobrenome);
    novaPessoa.contato.atualizarTelefone(dados.contato.telefone);
    novaPessoa.contato.atualizarEmail(dados.contato.email);

    return novaPessoa;

};
