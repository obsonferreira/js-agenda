export class Agenda {
    constructor() {
        this.contatos = [];
    };

    adicionar(contato) {
        return this.contatos.push(contato);
    };

    listar() {
        return this.contatos;
    };

    atualizar(dados, referencia) {
        let pessoa = this.contatos.find(usuario => usuario.id === referencia);
        return Object.assign(pessoa, dados);
    };

    buscar(referencia) {
        return this.contatos.find(usuario => usuario.id === referencia);
    };

    excluir(referencia) {
        const index = this.contatos.findIndex((pessoa => pessoa.id === referencia));
        if (index < 0) {
            return false;
        };
        this.contatos.splice(index, 1);
        return true;
    };
};

export const agendaRepositorio = new Agenda();

