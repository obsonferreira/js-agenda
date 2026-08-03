function verificaInput(inputUser) {

    const input = inputUser.toString();
    const numeroTeste = /^[0-9]$/;
    const letraTeste = /^[a-zA-ZÀ-ÿ]$/;
    const caracteresEspecialTeste = /^[\W_.-]$/;

    let numero = 0;
    let letra = 0;
    let char = 0;

    for (let index = 0; index < input.length; index++) {
        let caracter = input.at(index);

        if (numeroTeste.test(caracter)) {
            numero++;

        } else if (letraTeste.test(caracter)) {
            letra++;

        } else {
            char++;

        };
    };

    if (numero === input.length) {
        if (numero.length === 9) {
            return { output: input, numero: true };

        } else {
            return { output: parseInt(inputUser), numero: true };
        }
    } else if (letra === input.length) {

        return { output: input, nome: true };

    } else {

        return { output: input, email: true };
    };

};
