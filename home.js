'use strict'

import { getPets } from './pet.js'

let cards = []

async function carregarCards() {
    const resposta = await getPets()
    const pets = resposta.pets

    const container = document.getElementById('eventos-container')
    container.innerHTML = ''
    cards = []

    pets.forEach(pet => {
        const card = criarCard(pet)
        container.appendChild(card)
        cards.push(card)
    })

    atualizarCardsVisiveis()
}


function criarCard(pet) {
    const card = document.createElement('div')
    card.classList.add('card-contato')

    const fotoUrl = pet.foto

    card.innerHTML = `
        <img class="po" src="${fotoUrl}" alt="">
        <h2>${pet.nome}</h2>
        <p>${pet.endereco?.[0]?.uf ? 'Localização: ' + pet.endereco[0].uf : 'Localização desconhecida'}</p>
        <img class="inos icone-favorito" src="../img/like1.png" alt="Favoritar">
    `

    const icone = card.querySelector('.icone-favorito')
    let favoritado = false

    icone.addEventListener('click', (event) => {
        event.stopPropagation() // impede que o clique no coração redirecione
        favoritado = !favoritado
        icone.src = favoritado ? '../img/like.png' : '../img/like1.png'
    })

    // Torna o card clicável
    card.style.cursor = 'pointer'
    card.addEventListener('click', () => {
        localStorage.setItem('petSelecionado', JSON.stringify(pet))
        window.location.href = '../vizu/vizu.html?id=' + pet.id
    })

    return card
}

let quantidadeVisivel = 4

function atualizarCardsVisiveis() {
    cards.forEach((card, index) => {
        card.style.display = index < quantidadeVisivel ? 'flex' : 'none'
    })
}

function mostrarMais() {
    quantidadeVisivel += 8
    atualizarCardsVisiveis()
}

// Inicialização
carregarCards()
document.querySelector('.so button').addEventListener('click', mostrarMais)
