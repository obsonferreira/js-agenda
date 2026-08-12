import { agendaRepositorio } from "../modelos/agenda.js";

agendaRepositorio.contatos = carregarContatos();

export function salvar(pessoa) {
    pessoa.id = criarId();
    const dados = agendaRepositorio.adicionar(pessoa);
    if (!dados) {
        return false;
    };
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
    return true;
};

export function editar(dados, referencia) {
    const edicao = () => {
        const resultado = agendaRepositorio.atualizar(dados, referencia);
        if (!resultado) {
            return false;
        };
        localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
        return true;
    };
    return edicao();
};

export function deletarContato(referencia) {
    const validacao = agendaRepositorio.contatos.some(pessoa => pessoa.id === referencia);
    if (!validacao) {
        return false;
    };
    const exclusao = agendaRepositorio.excluir(referencia);
    localStorage.setItem('contatos', JSON.stringify(agendaRepositorio.contatos));
    return exclusao;
};

export function buscarContato(referencia) {
    const validacao = agendaRepositorio.contatos.some(pessoa => pessoa.id === referencia);
    if (!validacao) {
        return false;
    };
    return agendaRepositorio.buscar(referencia);
};

function carregarContatos() {
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

export function retornaId(referencia) {
    const lista = agendaRepositorio.listar();
    const verificacao = {
        telefone: lista.some(usuario => usuario.contato.telefone === referencia.contato.telefone),
        email: lista.some(usuario => usuario.contato.email === referencia.contato.email)
    };
    const id = (verificacao) => {
        const resultado = [];
        if (verificacao.telefone) {

            resultado.push(lista.find(usuario => usuario.contato.telefone === referencia.contato.telefone).id);
        };
        if (verificacao.email) {

            resultado.push(lista.find(usuario => usuario.contato.email === referencia.contato.email).id);
        };
        return parseInt([...new Set(resultado)]);
    };
    return id(verificacao);
};

function criarId() {
    const lista = agendaRepositorio.contatos;
    const gerarNumero = () => {
        const min = 1
        const max = 1000
        return Math.floor(Math.random() * (max - min) + min);
    };

    const retornaIdValido = () => {
        let idInvalido;
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
