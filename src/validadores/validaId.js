import { retornaLista } from "../repositorio/agendaRepositorio.js";

function geraNumero() {

    return Math.floor(Math.random() * 1000);

};

export function geraId() {
    let id = 0;
    const lista = retornaLista();
    if (lista.length === 0) {
        id = geraNumero();
    } else {
        let resultado = false;
        if (!resultado) {
        
            id = geraNumero();
            
            lista.forEach(contato => {

                if (contato.id !== id) {
                
                    resultado = true;

                };
            });
        };

    };

    return id;
};
