export function validaId(id, lista) {
    let resultado;
    if (lista.length > 0) {
        lista.forEach(contato => {
            if (contato.id !== id) {
                resultado = true;
            } else {
                resultado = false;
            };
        });
    } else {
        return true;
    };
    return resultado;

};

