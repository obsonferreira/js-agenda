import { geraId } from "../validadores/validaId.js";

export class Agenda {
    constructor() {

        this.contatos = [];
    };

    adicionar(contato) {

        contato.id = geraId();
        this.contatos.push(contato);
    };

    listar() {

        return this.contatos;
    };

    atualizar(dados, referencia) {

        let pessoa = this.contatos.find(usuario => usuario.id === referencia);
        Object.assign(pessoa, dados);
    };

    buscar(referencia) {

        return this.contatos.find(usuario => usuario.id === referencia);
    };

    excluir(referencia) {
    
        this.contatos.splice(referencia, 1);

    };
};

export const agendaRepositorio = new Agenda();

