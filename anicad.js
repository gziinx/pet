'use strict'

import { postPet, uploadImageToAzure } from './pet.js'

// Função genérica para carregar selects
async function carregarSelect(endpoint, selectId, arrayName, idField, textField) {
    try {
        const response = await fetch(`http://localhost:3030/v1/controle-pet/${endpoint}`)
        const result = await response.json()

        const selectElement = document.getElementById(selectId)

        result[arrayName].forEach(item => {
            const option = document.createElement('option')
            option.value = item[idField]
            option.textContent = item[textField]
            selectElement.appendChild(option)
        })
    } catch (error) {
        console.error(`Erro ao carregar ${endpoint}:`, error)
    }
}

// Carregar selects padrão
carregarSelect('especie', 'especie', 'especie', 'id', 'especie')
carregarSelect('porte', 'porte', 'porte', 'id', 'porte')
carregarSelect('sexo', 'sexo', 'sexo', 'id', 'sexo')

// Carregar comportamentos
async function carregarComportamentos() {
    try {
        const response = await fetch('http://localhost:3030/v1/controle-pet/comportamento')
        const result = await response.json()

        const container = document.getElementById('behaviorTags')

        result.comportamento.forEach(item => {
            const span = document.createElement('span')
            span.textContent = item.comportamento
            span.dataset.id = item.id
            span.dataset.nome = item.comportamento
            span.classList.add('tag-item')

            span.addEventListener('click', () => {
                span.classList.toggle('selected')
            })

            container.appendChild(span)
        })
    } catch (error) {
        console.error('Erro ao carregar comportamento:', error)
    }
}
carregarComportamentos()

// Carregar saúdes
async function carregarSaude() {
    try {
        const response = await fetch('http://localhost:3030/v1/controle-pet/saude')
        const result = await response.json()

        const container = document.getElementById('saudeContainer')

        result.saude.forEach(item => {
            const label = document.createElement('label')
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.value = item.id
            checkbox.dataset.nome = item.saude
            checkbox.checked = true

            label.appendChild(checkbox)
            label.append(` ${item.saude}`)

            container.appendChild(label)
        })
    } catch (error) {
        console.error('Erro ao carregar saúdes:', error)
    }
}
carregarSaude()

// Submissão do formulário
document.getElementById('bore').addEventListener('submit', async function (event) {
    event.preventDefault()

    const nome = document.getElementById('animalName').value
    const data_nascimento = document.getElementById('birthDate').value
    const necessidades = document.getElementById('sobre').value

    // Upload de imagem
    const uploadParams = {
        file: document.getElementById('upload').files[0],
        storageAccount: 'asei',
        sasToken: 'sp=racwdli&st=2025-06-12T17:12:24Z&se=2025-06-19T01:12:24Z&sv=2024-11-04&sr=c&sig=uF4r1CjXznKe6M2wztgcpYW8lkxMxlljIW6Hy3Vk8w4%3D',
        containerName: 'foto',
    }

    const fotoUrl = await uploadImageToAzure(uploadParams)

    // Comportamentos selecionados
    const selectedComportamentos = Array.from(document.querySelectorAll('#behaviorTags .selected')).map(span => ({
        id: parseInt(span.dataset.id),
        comportamento: span.dataset.nome
    }))

    // Saúdes selecionadas
    const selectedSaudes = Array.from(document.querySelectorAll('#saudeContainer input[type="checkbox"]:checked')).map(cb => ({
        id: parseInt(cb.value),
        saude: cb.dataset.nome
    }))

    // Dados do pet
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
        comportamento: selectedComportamentos,
        saude: selectedSaudes
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
