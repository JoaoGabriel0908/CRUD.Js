'use strict'

import { openModal, closeModal } from './modal.js'
import { readClients, createClient, deleteClient, uptadeClient } from './clients.js'

const createRow = ({ nome, email, celular, cidade, id }) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onClick="editClient(${id})">editar</button>
            <button type="button" class="button red" onClick="delClient(${id})">excluir</button>
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

const fillForm = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.id = client.id
}

globalThis.editClient = async (id) => {
    // Armazenar as informações dos clientes em uma variável
    const client = await readClients(id)
    // Preencher Formulário com as informações
    fillForm(client)
    // Abrir modal no estado de edição
    openModal()
}

// Variavel exportada pelo HTML
globalThis.delClient = async (id) => {
    await deleteClient(id)
    uptadeTable()
}
// Definindo um elemento especial pelo id
const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

// Salvando umm Cliente quando um usuário cria um
const saveClient = async () => {
    // Criar um Json com as informações do cliente
    const client = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    if (isEdit()) {
        client.id = document.getElementById('nome').dataset.id
        await uptadeClient(client)
    } else {
        // Enviar o Json para o servidor API
        createClient(client)
    }
        // Fechar a Modal
        closeModal()
        // Atualizar a tabela
        uptadeTable()
}
// const actionClient = async (event) => {

//     if(event.target.type == 'button'){
//         const [action, codigo] = event.target.id.split('-')

//         if (action == 'editar'){
//             await uptadeClient(codigo)
//             openModal()

//         } else if (action == 'excluir') {
//             await deleteClient(codigo)
//             uptadeTable()
//         }
//     }
// }

// Carregando a página chamando a função
uptadeTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
// document.getElementById('clients-container').addEventListener('click', actionClient)