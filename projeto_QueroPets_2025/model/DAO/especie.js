/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de Especie
 * Data: 27/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DA NOVA ESPECIE
const insertEspecie = async function(especie){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_especie (  
                                                especie
                                            )
                                            values(
                                                '${especie.especie}'
                                            )`

            // Executa o scriptSQL no BD e aguarda o retorno no mesmo para saber se deu certo
            let result = await prisma.$executeRawUnsafe(sql)
            
        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}


//ATUALIZAR UMA ESPECIE EXISTENTE
const updateEspecie = async function(especie){
    try {
        let sql = `update tbl_especie set      especie = '${especie.especie}'
                                               
                                                
                                where id = ${especie.id}`

    let result= await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UMA ESPECIE EXISTENTE
const deleteEspecie = async function(id){

    try {
        let sql = 'delete from tbl_especie where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS AS ESPECIES EXISTENTES
const selectAllEspecie = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_especie order by id desc'

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

//BUSCAR UMA ESPECIE PELO ID
const selectByIdEspecie = async function(id){

    try {

        let sql = `SELECT * FROM tbl_especie WHERE id = ${id}`
    
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        } catch (error) {
            return false
        }


}

module.exports = {
    insertEspecie,
    updateEspecie,
    deleteEspecie,
    selectAllEspecie,
    selectByIdEspecie
}