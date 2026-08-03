import { validaNome } from "../validadores/validaNome.js";

export class Pessoa {
    constructor(nome, sobrenome, contato) {

        this.nome = nome;
        this.sobrenome = sobrenome;
        this.contato = contato;

    };

    validarNome() {

        const resultado = validaNome(this.nome, 'nome');

        return resultado;

    };

    validarSobrenome() {

        const resultado = validaNome(this.sobrenome, 'sobrenome');

        return resultado;
    };

    atualizarNome(novoNome) {

        this.nome = novoNome;

    };
    atualizarSobrenome(novoSobrenome) {

        this.sobrenome = novoSobrenome;

    };

};


