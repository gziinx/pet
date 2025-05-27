/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de Contato
 * Data: 22/05/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO CONTATO
const insertContato = async function(contato){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_contato (  
                                                telefone,
                                                id_usuario
                                            )
                                            values(
                                                '${contato.telefone}',
                                                '${contato.id_usuario}'

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


//ATUALIZAR UM contato EXISTENTE
const updateContato = async function(contato){
    try {
        let sql = `update tbl_contato set       telefone = '${contato.telefone}',
                                                id_usuario = '${contato.id_usuario}'
                                                
                                where id = ${contato.id}`

    let result= await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM CONTATO EXISTENTE
const deleteContato = async function(id){

    try {
        let sql = 'delete from tbl_contato where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS OS CONTATO EXISTENTES
const selectAllContatos = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_contato order by id desc'

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

//BUSCAR UM CONTATO PELO ID
const selectByIdContato = async function(id){

    try {

        let sql = `SELECT * FROM tbl_contato WHERE id = ${id}`
    
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
    insertContato,
    updateContato,
    deleteContato,
    selectAllContatos,
    selectByIdContato
}