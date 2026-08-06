export function retornaMensagemEspaco(campo) {
    return `${campo} não pode ter espaço, verifique o ${campo} digitado!`;
};

export function retornaMensagemCaracterInvalido(campo, caracteres) {
    return `${campo} contém: "${caracteres}", ${(caracteres.length === 1) ? "caractere inválido" : "caracteres inválidos"}, verifique o ${campo} digitado!`;
};

export function retornaMensagemTamanhoMinimo(campo, tamanhoMinimo) {
    let palavraComplementar;
    if (campo === "telefone") {
        palavraComplementar = "dígitos";
    } else {
        palavraComplementar = "caracteres";
    };

    return `${campo} deve ter mínimo ${tamanhoMinimo} ${palavraComplementar}!`;
};

export function retornaMensagemTamanhoMaximo(campo, tamanhoMaximo) {
    let palavraComplementar;
    if (campo === "telefone") {
        palavraComplementar = "dígitos";
    } else {
        palavraComplementar = "caracteres";
    };

    return `${campo} deve ter máximo ${tamanhoMaximo} ${palavraComplementar}!`;
};
