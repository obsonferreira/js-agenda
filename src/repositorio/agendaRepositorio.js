import { agendaRepositorio } from "../modelos/agenda.js";
import { atualizarPessoa } from "../servicos/agendaService.js";
import { validaDuplicidade } from "../validadores/validaDuplicidade.js";
import { validaId } from "../validadores/validaId.js";

agendaRepositorio.contatos = carregarContatos();

export function salvarContato(pessoa) {
    pessoa.id = criarId();
    agendaRepositorio.adicionar(pessoa);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
};

export function editarContato(dados, parametro) {
    const pessoa = agendaRepositorio.buscar(parametro);
    const novaPessoa = atualizarPessoa(pessoa, dados);
    agendaRepositorio.atualizar(novaPessoa, parametro);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
};

export function deletarContato(referencia) {

    agendaRepositorio.excluir(referencia);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
};

export function buscaContato(input) {
    let idContato = retornaId(input);

    return agendaRepositorio.buscar(idContato);
};

export function carregarContatos() {

    const dadosSalvo = localStorage.getItem('contatos');
    let arrayRecuperado;
    if (dadosSalvo == null) {
        arrayRecuperado = [];
    } else {

        arrayRecuperado = JSON.parse(dadosSalvo);
    };

    return arrayRecuperado;
};

export function retornaLista() {

    return agendaRepositorio.listar();
};

function retornaId(input) {
    const lista = agendaRepositorio.listar();

    const dadosId = {
        telefone: lista.find(usuario => usuario.contato.telefone === input.contato.telefone).id,
        email: lista.find(usuario => usuario.contato.email === input.contato.email).id
    };

    const idLista = new Set(Object.values(dadosId));
    const id = idLista.values();

    return id.next().value;
};

export function buscaDuplicidade(contato) {
    const resultado = {};
    if (!contato.email.erro) {
        resultado.email = validaDuplicidade(contato.email, retornaLista());
    } else {
        resultado.email = {
            campo: contato.email.campo,
            valor: contato.email.valor,
            erro: false,
            mensagem: ""
        };
    };

    if (!contato.telefone.erro) {
        resultado.telefone = validaDuplicidade(contato.telefone, retornaLista());
    } else {
        resultado.telefone = {
            campo: contato.telefone.campo,
            valor: contato.telefone.valor,
            erro: false,
            mensagem: ""

        };
    };
    return resultado;
};

function criarId() {
    const lista = agendaRepositorio.contatos;
    const gerarNumero = () => {
        const min = 1
        const max = 1000
        return Math.floor(Math.random() * (max - min) + min);
    };

    const retornaIdValido = () => {
        let idInvalido ;
        do {
            const id = gerarNumero();
            idInvalido = lista.some(pessoa => pessoa.id === id);
            if (!idInvalido) {
                return id;
            };
        } while (idInvalido);
    };
    return retornaIdValido();
};
