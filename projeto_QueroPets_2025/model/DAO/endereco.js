/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de endereco
 * Data: 22/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO endereco
const insertEndereco = async function(endereco){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_endereco (  
                                                estado ,
                                                cep
                                            )
                                            values(
                                                '${endereco.estado}',
                                                '${endereco.cep}'

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


//ATUALIZAR UM ENDERECO EXISTENTE
const updateEndereco = async function(endereco){
    try {
        let sql = `update tbl_endereco set      estado = '${endereco.estado}',
                                                cep = '${endereco.cep}'
                                                
                                where id = ${endereco.id}`

    let resultEnderec= await prisma.$executeRawUnsafe(sql)

    if(resultEnderec)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM ENDERECO EXISTENTE
const deleteEndereco = async function(id){

    try {
        let sql = 'delete from tbl_endereco where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS OS ENDERECOS EXISTENTES
const selectAllEndereco = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_endereco order by id desc'

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

//BUSCAR UM ENDERECO PELO ID
const selectByIdEndereco = async function(id){

    try {

        let sql = `SELECT * FROM tbl_endereco WHERE id = ${id}`
    
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
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    selectAllEndereco,
    selectByIdEndereco
}