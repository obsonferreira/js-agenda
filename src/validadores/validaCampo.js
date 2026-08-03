import { retornaComposicaoInput } from "./analisaTexto.js";

export function validaEntrada(campo) {
    const componentes = retornaComposicaoInput(campo.value); 

    if (componentes.quantidadeEspaco === componentes.tamanhoInput) {

        return {
            campo: campo.name,
            valor: campo.value,
            erro: true,
            mensagem: `Campo obrigatório, digite um ${campo.name} válido!`
        };

    }else if (componentes.tamanhoInput > 30) {
        return {
            campo: campo.name,
            valor:campo.value,
            erro: true,
            mensagem: `Tamanho máximo atingido, digite um ${campo.name} válido!`
        };
    } else {
        return {
            campo: campo.name,
            valor: campo.value,
            erro: false,
            mensagem: ``
        };
    };
        
};