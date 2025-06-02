'use strict'

document.getElementById('bore').addEventListener('submit', async function (event) {
    event.preventDefault()

    // Coleta os dados do formulário
    const nome = document.getElementById('animalName').value
    const data_nascimento = document.getElementById('birthDate').value
    const foto = document.getElementById('upload').value
    const necessidades = document.getElementById('sobre').value

    try {


        //https://projeto-queropets-2025-1.onrender.com/v1/controle-pet/usuario
        const userResponse = await fetch('http://localhost:8080/v1/controle-pet/pet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                data_nascimento: data_nascimento,
                foto: foto,
                necessidades: necessidades,
                id_porte: 1,
                id_status: 1,
                id_raca: 1,
                id_sexo: 1,
                id_temperamento: 1,
                id_especie: 1,
                id_saude: 1
            })
        })

        if (userResponse.ok) {
            alert('Pet cadastrado com sucesso!')
            window.location.href = '../../index.html'
        } else {
            const errorData = await userResponse.json()
            console.error(errorData)
            alert('Erro ao cadastrar pet.')
        }

    } catch (error) {
        console.error(error)
        alert('Erro no processo de cadastro.')
    }
})