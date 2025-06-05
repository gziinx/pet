/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de pet
 * Data: 22/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO pet
const insertPet = async function(pet){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_pet (  
                                                nome,
                                                data_nascimento,
                                                foto,
                                                necessidades,
                                                id_endereco,
                                                id_porte,
                                                id_raca,
                                                id_sexo,
                                                id_temperamento,
                                                id_especie,
                                                id_saude
                                            )
                                            values(
                                                '${pet.nome}',
                                                '${pet.data_nascimento}',
                                                '${pet.foto}',
                                                '${pet.necessidades}',
                                                '${pet.id_endereco}',
                                                '${pet.id_porte}',
                                                '${pet.id_raca}',
                                                '${pet.id_sexo}',
                                                '${pet.id_temperamento}',
                                                '${pet.id_especie}',
                                                '${pet.id_saude}'
                                               
                                            )`


            // Executa o scriptSQL no BD e aguarda o retorno no mesmo para saber se deu certo
            let result = await prisma.$executeRawUnsafe(sql)

            
            if(result){
                let getID = `SELECT * FROM tbl_pet WHERE nome = '${pet.nome}' ORDER BY id DESC LIMIT 1 `

                let idPego = await prisma.$queryRawUnsafe(getID)
                
                return idPego[0]
                
            }else{
                return false
            }
        
    } catch (error) {
        console.log(error);
        return false
    }
}


//ATUALIZAR UM pet EXISTENTE
const updatePet = async function(pet){
    try {
        let sql = `update tbl_pet set       nome = '${pet.nome}',
                                                data_nascimento = '${pet.data_nascimento}',
                                                foto = '${pet.foto}',
                                                necessidades = '${pet.necessidades}',
                                                id_porte = '${pet.id_porte}',
                                                id_raca = '${pet.id_raca}',
                                                id_sexo = '${pet.id_sexo}',
                                                id_temperamento = '${pet.id_temperamento}',
                                                id_especie = '${pet.id_especie}',
                                                id_saude = '${pet.id_saude}',
                                                id_endereco = '${pet.id_endereco}'
                                where id = ${pet.id}`

    let resultpet= await prisma.$executeRawUnsafe(sql)

    if(resultpet)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM pet EXISTENTE
const deletePet = async function(id){
    try {
        let sql = `delete from tbl_pet where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS OS petS EXISTENTES
const selectAllPets = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_pet order by id desc'

        //Executa o ScriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//BUSCAR UM pet PELO ID
const selectByIdPet = async function(id){

    try {

        let sql = `SELECT * FROM tbl_pet WHERE id = ${id}`
    
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        } catch (error) {
            return false
        }


}


const selectLastInsertId = async function(){
    try {
        let sql = `select id from tbl_pet order by id desc limit 1`

        let result =  await prisma.$queryRawUnsafe(sql) 
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertPet,
    updatePet,
    deletePet,
    selectAllPets,
    selectByIdPet,
    selectLastInsertId
}