import { geraId } from "../validadores/validaId.js";
import { Pessoa } from "./pessoa.js";
import { Contato } from "./contato.js";
import { atualizarPessoa } from "../servicos/agendaService.js";

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

        const novaPessoa = atualizarPessoa(pessoa, dados);
        Object.assign(pessoa, novaPessoa);
    };

    buscar(referencia) {

        return this.contatos.find(usuario => usuario.id === referencia);
    };

    excluir(referencia) {
        let index;

        this.contatos.forEach((pessoa) => {

            if (pessoa.id === referencia) {
                index = this.contatos.indexOf(pessoa);
            };

        });

        if (index > -1) {
            this.contatos.splice(index, 1);
        };
    };
};

export const agendaRepositorio = new Agenda();

