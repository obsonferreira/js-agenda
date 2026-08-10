
export function contratoValidacoesComErro(campo,valor,mensagem) {

    return {
        campo: campo,
        valor: valor,
        erro: true,
        mensagem: mensagem
    };
};
export function contratoValidacoesSemErro(campo,valor) {

    return {
        campo: campo,
        valor: valor,
        erro: false,
        mensagem: ""
    };
};