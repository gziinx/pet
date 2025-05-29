/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de SEXO DO PET
 * Data: 22/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO USUARIO
const insertSexo = async function(sexo){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_sexo (  
                                                sexo
                                            )
                                            values(
                                                '${sexo.sexo}'
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
const updateSexo = async function(sexo){
    try {
        let sql = `update tbl_sexo set      sexo = '${sexo.sexo}'
                                               
                                                
                                where id = ${sexo.id}`

    let result= await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM ENDERECO EXISTENTE
const deleteSexo = async function(id){

    try {
        let sql = 'delete from tbl_sexo where id = ?'

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
const selectAllSexo = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_sexo order by id desc'

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
const selectByIdSexo = async function(id){

    try {

        let sql = `SELECT * FROM tbl_sexo WHERE id = ${id}`
    
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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}