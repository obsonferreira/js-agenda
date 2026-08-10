import { contratoValidacoesSemErro } from "../contratos/validacoes.js";
import { validacaoGeral } from "./compartilhado.js";

export function validaPessoa(pessoa) {

    const sobrenome = (pessoa) => {
        if (pessoa.sobrenome.length <= 0) {
            return contratoValidacoesSemErro('sobrenome',"");
        } else {
            return pessoa.validarSobrenome();
        };
    };
    const validacao = {
        nome: pessoa.validarNome(),
        sobrenome: sobrenome(pessoa),
        telefone: pessoa.contato.validarTelefone(),
        email: pessoa.contato.validarEmail()
    };

    validacao.dadosInvalidos = validacaoGeral(validacao);

    return validacao;
};
