import { buscaContato } from "../../repositorio/agendaRepositorio.js";
import { elementoDialogoEdicao } from "./elementosAgenda.js";

export function preencheFormulario(formulario, id) {
    const dados = buscaContato(id);
    
    for (const chave in dados) {
        if (formulario.elements[chave]) {
            formulario.elements[chave].value = dados[chave];
        };

        if (chave === "contato") {
            for (const contato in dados.contato) {
                if (formulario.elements[contato]) {
                    formulario.elements[contato].value = dados.contato[contato];
                };
            };
        };
    };

    elementoDialogoEdicao.modalEdicao.showModal();
};

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
};

export function criarTabelaContato(lista) {
    const corpo = document.createElement("tbody");
    lista.forEach((pessoa) => {
        const valorLinha = document.createElement("tr");
        valorLinha.dataset.id = pessoa.id;
        valorLinha.classList.add(lista.indexOf(pessoa) + 1);

        valorLinha.appendChild(criarCelula(lista.indexOf(pessoa) + 1));
        valorLinha.appendChild(criarCelula(pessoa.nome));
        valorLinha.appendChild(criarCelula(pessoa.sobrenome));

        [pessoa.contato].forEach((contatos) => {
            valorLinha.appendChild(criarCelula(contatos.telefone));
            valorLinha.appendChild(criarCelula(contatos.email));
        });

        valorLinha.appendChild(criarBotaoEditar());
        corpo.appendChild(valorLinha);
    });
    return corpo;
};

export function retornaDadosTabela(elemento) {

    const celulas = elemento.getElementsByTagName("td");
    const valorCelula = Array.from(celulas).map(dados => {
        const valor = dados?.innerText.trim();
        return valor;
    });
    valorCelula.shift();
    valorCelula.pop();


    return {
        nome: valorCelula[0],
        sobrenome: valorCelula[1],
        contato: {
            telefone: valorCelula[2],
            email: valorCelula[3]
        }
    };
};

function criarBotaoEditar() {

    const td = document.createElement('td');
    const botao = document.createElement("button");
    botao.classList.add("btn-editar");
    botao.textContent = "Editar";
    td.appendChild(botao);
    return td;
};