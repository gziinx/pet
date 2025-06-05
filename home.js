document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-contato');
    const btnMostrarMais = document.querySelector('.so button');
    const icone = document.getElementById('icone-favorito');
    let favoritado = false;
  
    let quantidadeVisivel = 4;
  
    function atualizarCardsVisiveis() {
      cards.forEach((card, index) => {
        card.style.display = index < quantidadeVisivel ? 'flex' : 'none';
      })
    }
  
    btnMostrarMais.addEventListener('click', () => {
      quantidadeVisivel += 8;
      atualizarCardsVisiveis();
    });
  
    // Inicializa com os primeiros 4 cards
    atualizarCardsVisiveis();
    icone.addEventListener('click', () => {
        favoritado = !favoritado;
    
        if (favoritado) {
          icone.src = './queropet/img/like.png'
        } else {
          icone.src = './queropet/img/like1.png'
        }
      });

      // exemplo em um arquivo home.js ou main.js


  });
  
  import { getPets } from './pet'

async function preencherCards() {
    const pets = await getPets()

    pets.forEach(pet => {
        // Criação dinâmica de card
        const card = document.createElement('div')
        card.classList.add('card') // ou qualquer classe CSS

        card.innerHTML = `
            <img src="${pet.foto}" alt="${pet.nome}" />
            <h2>${pet.nome}</h2>
            <p>${pet.necessidades}</p>
        `

        document.querySelector('#container-cards').appendChild(card)
    })
}

preencherCards()