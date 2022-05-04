'use strict'

// Consumindo a API do CLiente

const url = 'https://testeleonid.herokuapp.com/clientes'

// Listando Cliente
const readClients = async(id='') => {
    const response = await fetch(`${url}/${id}`)
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
const uptadeClient = async(client) => {
    const options = {
        'method': 'PUT',
        'body': JSON.stringify(client),
        'headers': {
            'content-type': 'application/json'
        }
    }
    const response = await fetch (`${url}/${client.id}`, options)
    console.log('UPDATE', response.ok)
    
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