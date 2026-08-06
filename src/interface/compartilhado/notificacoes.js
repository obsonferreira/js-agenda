
export function ocultarAtributo(elemento) {
    return elemento.setAttribute('hidden', '');
};

export function exibirAtributo(elemento) {    
    return elemento.removeAttribute('hidden');
};

export function exibirMensagem(elemento, mensagem) {
    elemento.textContent = mensagem;
};

