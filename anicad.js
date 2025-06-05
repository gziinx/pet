'use strict'

import { postPet } from './pet.js'

document.getElementById('bore').addEventListener('submit', async function (event) {
    event.preventDefault()

    const nome = document.getElementById('animalName').value
    const data_nascimento = document.getElementById('birthDate').value
    const foto = document.getElementById('upload').value
    const necessidades = document.getElementById('sobre').value

    const petData = {
        nome: nome,
        data_nascimento: data_nascimento,
        foto: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
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
    console.log('Pet enviado:', JSON.stringify(petData, null, 2))

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
