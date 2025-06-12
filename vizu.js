'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const pet = JSON.parse(localStorage.getItem('petSelecionado'))

  if (!pet) {
    alert('Pet não encontrado.')
    return
  }

  document.getElementById('petnome').textContent = pet.nome || 'Nome desconhecido'

  document.getElementById('imagempet').innerHTML = `<img src="${pet.foto}" style="height: 100%; width: 100%; object-fit: cover;" />`

  document.getElementById('especie').textContent = pet.especie?.[0]?.especie || 'Espécie não informada'
  document.getElementById('raca').textContent = pet.raca?.[0]?.raca || 'Raça não informada'
  document.getElementById('sexo').textContent = pet.sexo?.[0]?.sexo || 'Sexo não informado'
  document.getElementById('porte').textContent = pet.porte?.[0]?.porte || 'Porte não informado'


  document.getElementById('endereco').textContent =
  pet.endereco?.[0]?.uf
    ? `Localização: ${pet.endereco[0].uf}`
    : 'Localização não informada'

  document.getElementById('sobre_o_pet').textContent = pet.necessidades || 'Sem descrição.'

  // SAÚDE
  const containerSaude = document.getElementById('situacao')
containerSaude.innerHTML = '' // limpa os itens anteriores

pet.saude?.forEach(s => {
  const div = document.createElement('div')
  div.textContent = s.saude
  containerSaude.appendChild(div)
})
  // COMPORTAMENTO
  const comportamentos = pet.comportamento || []
  const container = document.getElementById('aquela_lista_de_comportamento')
  container.innerHTML = ''

  comportamentos.forEach(comport => {
    const div = document.createElement('div')
    div.textContent = comport.comportamento || comport // depende se vem como objeto ou string
    container.appendChild(div)
  })
})
