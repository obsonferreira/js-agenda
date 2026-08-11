export function contratoOperacaoSemFalha(contato) {
    return {
        sucesso: true,
        dados: contato,
        erro: null,
        mensagem: ""
    };

};

export function contratoOperacaoComFalha(erro,mensagem) {
    return {
        sucesso: false,
        dados: null,
        erro: erro,
        mensagem: mensagem
    };

};