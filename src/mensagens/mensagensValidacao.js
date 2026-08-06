export function retornaMensagemEspaco(campo) {
    const campoFormatado = campo.charAt(0).toUpperCase() + campo.slice(1);
    return `${campoFormatado} não pode conter espaço.`;
};

export function retornaMensagemCaracterInvalido(campo, caracteres) {
    const campoFormatado = campo.charAt(0).toUpperCase() + campo.slice(1);
    return `${campoFormatado} contém ${(caracteres.length === 1) ? "o caractere inválido" : "os caracteres inválidos"}: "${caracteres}".`;
};

export function retornaMensagemTamanhoMinimo(campo, tamanhoMinimo) {

    const campoFormatado = campo.charAt(0).toUpperCase() + campo.slice(1);
    const palavraComplementar = (campo) => {
        if (campo === "telefone") {
            return "dígitos";
        } else {
            return "caracteres";
        };
    };

    return `${campoFormatado} deve ter no mínimo ${tamanhoMinimo} ${palavraComplementar(campo)}.`;
};

export function retornaMensagemTamanhoMaximo(campo, tamanhoMaximo) {

    const campoFormatado = campo.charAt(0).toUpperCase() + campo.slice(1);
    const palavraComplementar = (campo) => {
        if (campo === "telefone") {
            return "dígitos";
        } else {
            return "caracteres";
        };
    };

    return `${campoFormatado} deve ter no máximo ${tamanhoMaximo} ${palavraComplementar(campo)}.`;
};
