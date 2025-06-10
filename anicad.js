'use strict'

import { postPet, uploadImageToAzure } from './pet.js'

// Função genérica para preencher os selects
async function carregarSelect(endpoint, selectId, arrayName, idField, textField) {
    try {
        const response = await fetch(`http://localhost:3030/v1/controle-pet/${endpoint}`)
        const result = await response.json()

        const selectElement = document.getElementById(selectId)

        result[arrayName].forEach(item => {
            let option = document.createElement('option')
            option.value = item[idField]
            option.textContent = item[textField]

            selectElement.appendChild(option)
        })
    } catch (error) {
        console.error(`Erro ao carregar ${endpoint}:`, error)
    }
}

// Carregar todos os selects quando a página carregar
carregarSelect('especie', 'especie', 'especie', 'id', 'especie')
carregarSelect('porte', 'porte', 'porte', 'id', 'porte')
carregarSelect('sexo', 'sexo', 'sexo', 'id', 'sexo')

// Evento de submit do formulário
document.getElementById('bore').addEventListener('submit', async function (event) {
    event.preventDefault()

    const nome = document.getElementById('animalName').value
    const data_nascimento = document.getElementById('birthDate').value

    // Upload da imagem
    const uploadParams = {
        file: document.getElementById('upload').files[0],
        storageAccount: 'asei',
        sasToken: 'sp=racwl&st=2025-06-10T14:03:41Z&se=2025-06-10T22:03:41Z&sv=2024-11-04&sr=c&sig=Q1%2FUAgTmFUBfRtVXfrHIV9drDEzDn74iqxmgZ0LCt%2Fs%3D',
        containerName: 'foto',
    }

    const fotoUrl = await uploadImageToAzure(uploadParams)

    const necessidades = document.getElementById('sobre').value

    const petData = {
        nome: nome,
        data_nascimento: data_nascimento,
        foto: fotoUrl,
        necessidades: necessidades,
        id_endereco: 1,
        id_porte: 1,
        id_raca: 1,
        id_sexo: 1,
        id_temperamento: 1,
        id_especie: 1,
    comportamento: [{id: 1

        }
           ],
        saude:[
            {id: 1}
        ]
        
    }

    console.log(petData)

    try {
        const response = await postPet(petData)

        if (response.ok) {
            alert('Pet cadastrado com sucesso!')
            window.location.href = '../home/home.html'
        } else {
            const errorData = await response.json()
            console.error(errorData)
            alert('Erro ao cadastrar pet.')
        }
    } catch (error) {
        console.error(error)
        alert('Erro no processo de cadastro.')
    }
})
