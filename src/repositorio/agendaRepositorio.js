import { agendaRepositorio } from "../modelos/agenda.js";

agendaRepositorio.contatos = carregarContatos();

export function salvarContato(pessoa) {
    agendaRepositorio.adicionar(pessoa);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
};

export function editarContato(dados, parametro) {
    agendaRepositorio.atualizar(dados, parametro);
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
        nome: lista.find(usuario => usuario.nome === input.nome).id,
        sobrenome: lista.find(usuario => usuario.sobrenome === input.sobrenome).id,
        telefone: lista.find(usuario => usuario.contato.telefone === input.contato.telefone).id,
        email: lista.find(usuario => usuario.contato.email === input.contato.email).id
    };

    const idLista = new Set(Object.values(dadosId));
    const id = idLista.values();

    return id.next().value;
};
