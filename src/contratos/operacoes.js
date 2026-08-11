export function contratoOperacaoSemFalha(dados,mensagem) {
    return {
        sucesso: true,
        dados: dados,
        erro: null,
        mensagem: mensagem
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