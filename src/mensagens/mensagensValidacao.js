export function retornaMensagemEspaco(campo) {
    return `${campo} não pode ter espaço, verifique o ${campo} digitado!`;
};

export function retornaMensagemCaracterInvalido(campo, caracteres) {
    return `${campo} contem: "${caracteres}", ${(caracteres.length === 1) ? "digito invalido" : "digitos invalidos"}, verifique o ${campo} digitado!`;
};

export function retornaMensagemTamanhoMinimo(campo, tamanhoMinimo) {
    return `${campo} pequeno, ${campo} deve ter minimo ${tamanhoMinimo} digitos, verifique o ${campo} digitado!`;
};
