export function retornaComposicaoInput(input) {
    
    return {
        quantidadeEspaco: input.replace(/[^\s]/g, "").length,
        tamanhoInput: input.length,
        caracteresEspecial: input.replace(/[\p{L}\p{N}]/gu, ""),
        letras: input.replace(/[^\p{L}]/gu, ""),
        numero: input.replace(/[^\d]/g, "")
    };

};

export function retornaComposicaoEmail(input) {
    let componentes = {};

    let posicaoArroba = input.indexOf('@');

    componentes.quantidadeEspaco = input.replace(/[^\s]/g, "").length;
    componentes.tamanhoInput = input.length;

    componentes.idEmail = input.substring(0, posicaoArroba);
    componentes.caracteresInvalidosIdEmail = componentes.idEmail.replace(/[\w_.]/g, "");
    componentes.caracterConsecutivosIdEmail = retornaConsecutivos(componentes.idEmail);

    componentes.dominioEmail = input.substring(posicaoArroba + 1);
    componentes.caracteresInvalidosDominioEmail = componentes.dominioEmail.replace(/[A-Za-z.]/g, "");
    componentes.nomeDominio = componentes.dominioEmail.substring(0, componentes.dominioEmail.indexOf('.'));
    componentes.complementoDominio = componentes.dominioEmail.substring(componentes.dominioEmail.indexOf('.') + 1, componentes.dominioEmail.length);

    componentes.caracterConsecutivosDominioEmail = retornaConsecutivos(componentes.dominioEmail);
    componentes.caracterValidosDominioEmail = componentes.dominioEmail.replace(/[^.]/g, "");

    componentes.caracterValidoEmail = input.replace(/[^@]/g, "");

    componentes.primeiroDigitoEmail = input.at(0);
    componentes.ultimoDigitoEmail = input.at(componentes.tamanhoInput - 1);

    return componentes;
};

function retornaConsecutivos(inputUser) {

    const caracteresEspecial = /^[\W_.-]$/;

    let iguais = [];

    for (let index = 0; index < inputUser.length; index++) {

        let caracter = inputUser.at(index);

        if (caracter === inputUser.at(index + 1) && caracteresEspecial.test(caracter)) {

            iguais.push(caracter);
        };
    };

    return iguais;
};