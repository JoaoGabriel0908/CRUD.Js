'use strict'

// Consumindo a API do CLiente

const url = 'https://testeleonid.herokuapp.com/clientes'

// Listando Cliente
const readClients = async() => {
    const response = await fetch(url)
    return await response.json()
}

// Criando Cliente
const createClient = async(client) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(client),
        'headers': {
            'content-type': 'application/json'
        }
    }
    const response = await fetch(url, options)
    console.log (response.ok)
}

// Deletando Cliente
const deleteClient = async(codigo) => {
    const options = {
        'method': 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
    console.log(response.ok)
}

const preencherCampos = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
}

const uptadeClient = async(codigo) => {
    const client = await readClients()[codigo]
    console.log(client)
    preencherCampos(client)
    // const options = {
    //     'method': 'PUT',
    //     'body': JSON.stringify(codigo),
    //     'headers': {
    //         'content-type': 'application/json'
    //     }
    // }

    // const response = await fetch(`${url}/${codigo}`, options)
    // console.log(response.ok)
}

export{readClients, createClient, deleteClient, uptadeClient}