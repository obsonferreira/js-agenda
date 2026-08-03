import { validaTelefone } from "../validadores/validaTelefone.js";
import { validaEmail } from "../validadores/validaEmail.js";

export class Contato {

    constructor(telefone, email) {

        this.telefone = telefone;
        this.email = email;
    };

    validarTelefone() {

        const resultado = validaTelefone(this.telefone, 'telefone');

        return resultado;

    };

    validarEmail() {

        const resultado = validaEmail(this.email, 'email');

        return resultado;
    };

    atualizarTelefone(novoTelefone) {

        this.telefone = novoTelefone;
    };

    atualizarEmail(novoEmail) {

        this.email = novoEmail;
    };

};