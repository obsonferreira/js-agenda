export function validacaoGeral(validacao) {
    let contaErros = 0;
    let dados = Object.values(validacao); 
    for (let index = 0; index < dados.length; index++) {

        if (dados[index].erro) {
            contaErros++;
        };
    };

    if (contaErros > 0) { 
        return true;
    } else {
        return false;
    };
};