export function retornaMensagemEspaco(campo) {
    return `${titulo(campo)} não pode conter espaço.`;
};

export function retornaMensagemCaracterInvalido(campo, caracteres) {
    return `${titulo(campo)} contém ${(caracteres.length === 1) ? "o caractere inválido" : "os caracteres inválidos"}: "${caracteres}".`;
};

export function retornaMensagemTamanhoMinimo(campo, tamanhoMinimo) {
    const palavraComplementar = (campo) => {
        if (campo === "telefone") {
            return "dígitos";
        } else {
            return "caracteres";
        };
    };
    return `${titulo(campo)} deve ter no mínimo ${tamanhoMinimo} ${palavraComplementar(campo)}.`;
};

export function retornaMensagemTamanhoMaximo(campo, tamanhoMaximo) {
    const mensagem = (campo) => {
        if (campo === "telefone") {
            return `${titulo(campo)} deve ter exatamente ${tamanhoMaximo} "dígitos".`;
        } else {
            return `${titulo(campo)} deve ter no máximo ${tamanhoMaximo} caracteres.`;
        };
    };
    return mensagem(campo);
};

export function retornaMensagemDominio(){
    return `Nome do domínio deve ter no mínimo 2 caracteres.`
};

export function retornaMensagemArrobaExtra(campo){
    return `${titulo(campo)} contém mais de um caractere "@".`
};

export function retornaMensagemSemArroba(campo){
    return `${titulo(campo)} deve conter exatamente um caractere "@".`
};

export function retornaMensagemSemPonto(campo){
    return `${titulo(campo)} deve possuir um ponto no domínio.`
};

export function retornaMensagemInicioInvalido(campo,caracteres){
    return `${titulo(campo)} não pode começar com "${caracteres}".`
};

export function retornaMensagemFinalInvalido(campo,caracteres){
    return `${titulo(campo)} não pode terminar com "${caracteres}".`
};

export function retornaMensagemCaracterConsecutivos(campo,caracteres){
    return `${titulo(campo)} não pode conter "${caracteres}" consecutivos.`
};

export function retornaMensagemComplementoDominio(campo){
    return `Domínio do ${campo} deve possuir um complemento, como ".com".`
};

export function retornaMensagemPontoExtraDominio(campo){
    return `Domínio do ${campo} contém pontos excedentes.`
};

export function retornaMensagemCampoObrigatorio(campo){
    return `${titulo(campo)} é obrigatório.`;
};




function titulo(campo) {
    return campo.charAt(0).toUpperCase() + campo.slice(1);
};