export const getPets = async () => {
    const url = 'http://localhost:8080/v1/controle-pet/pet' // ou sua URL do Render

    try {
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Erro ao buscar pets:', response.status)
            return []
        }
    } catch (error) {
        console.error('Erro na requisição:', error)
        return []
    }
}
