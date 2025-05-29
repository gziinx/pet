/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de status no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova status
 const insertStatus = async function(status){
     try{
         let sql  = `insert into tbl_status (
                         status
                        )  values ( 
                         '${status.status}'
                         )`

         //Await só vai funcionar se na função estiver com o async
         //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
         let result  = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return  true
         else
             return false//Bug no Banco de dados
         
         }catch(error){
             
             return false//Bug de programação
     }
 
 }
 //Função para atualizar uma status existente
 const updateStatus = async function(status){
     try {
         let sql = `update tbl_status set status = '${status.status}' where id = ${status.id} `
 
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma status existente
 const deleteStatus = async function(id){
     try {
 
         let sql = `delete from tbl_status where id=${id}`
 
         //
         let result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
 
         
     } catch (error) {
         return false
     }
 }
 //Função para retornar todas as status do banco de dados
 const selectAllStatus = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_status order by id desc'
 
         //Encaminha o script SQL para o Banco de dados
         let result = await prisma.$queryRawUnsafe(sql)
 
         if(result)
             return result//retorna dados do banco
         else
             return false
 
     } catch (error) {
         return false
     }
 }
 //Função para buscar uma status pelo ID
 const selectByIdStatus = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_status where id=${id} `
 
         // Encaminha o Script SQL para o BD
         let result = await prisma.$queryRawUnsafe(sql)
         
         if(result)
             return result // Retorna os dados do Banco 
         else
             return false
 
     } catch (error) {
         return false
     }
 }
 
 
 module.exports = {
     insertStatus,
     updateStatus,
     deleteStatus,
     selectAllStatus,
     selectByIdStatus
 }