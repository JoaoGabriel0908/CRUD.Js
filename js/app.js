'use strict'

import { openModal, closeModal } from './modal.js'
import { readClients, createClient, deleteClient, uptadeClient } from './clients.js'

const createRow = (client, codigo) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${codigo}">editar</button>
            <button type="button" class="button red" id="excluir-${codigo}">excluir</button>
        </td>
    `
    return row
}

// Método para carregar os clientes quando carregar a página
const uptadeTable = async () => {

    const clientsContainer = document.getElementById('clients-container')

    // Ler a API e armazenar o resultado em uma variavel
    const clients = await readClients()

    // Preencher a tabela com as informações
    const rows = clients.map(createRow)

    // Colocando elemento por elemento no id clientsContainer
    clientsContainer.replaceChildren(...rows)
}

// Salvando umm Cliente quando um usuário cria um
const saveClient = async() => {

    // Criar um Json com as informações do cliente
    const client = {
        "id":       "",
        "nome":     document.getElementById('nome').value,
        "email":    document.getElementById('email').value,
        "celular":  document.getElementById('celular').value,
        "cidade":   document.getElementById('cidade').value
    }

    const codigo = document.getElementById('nome').dataset.codigo
    if(codigo == 'new'){
        // Enviar o Json para o servidor API
        await createClient(client)
        // Fechar a Modal
        closeModal()
        // Atualizar a tabela
        uptadeTable()
    } else {
        uptadeClient(client, codigo)
        uptadeTable()
        closeModal()
    }
    
}

const actionClient = async (event) => {
    
    if(event.target.type == 'button'){
        const [action, codigo] = event.target.id.split('-')

        if (action == 'editar'){
            await uptadeClient(codigo)
            openModal()

        } else if (action == 'excluir') {
            await deleteClient(codigo)
            uptadeTable()
        }
    }
}

// Carregando a página chamando a função
uptadeTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
document.getElementById('clients-container').addEventListener('click', actionClient)