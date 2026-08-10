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
        sucesso: true,
        dados: null,
        erro: erro,
        mensagem: mensagem
    };

};