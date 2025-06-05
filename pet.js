'use strict'

const baseUrl = 'http://localhost:3030/v1/controle-pet/pet'

// GET todos os pets
export async function getPets() {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data
}

// POST novo pet
export async function postPet(pet) {
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    }

    const response = await fetch(baseUrl, options)
    return response
}

// Exemplo de objeto de teste (caso precise testar localmente)
const petTest = {
    nome: "sla",
    data_nascimento: "2025-05-01",
    foto: "teste",
    necessidades: "Precisa de observação",
    id_endereco: 1,
    id_porte: 1,
    id_raca: 1,
    id_sexo: 1,
    id_temperamento: 1,
    id_especie: 1,
    comportamento: [
        { id: 1 },
        { id: 2 }
    ],
    saude: [
        { id: 2 },
        { id: 1 }
    ]
}
