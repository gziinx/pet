/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de comportamento no Banco de dados
* Data: 29/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova comportamento
 const insertComportamento = async function(comportamento){
     try{
         let sql  = `insert into tbl_comportamento (
                         comportamento
                        )  values ( 
                         '${comportamento.comportamento}'
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
 //Função para atualizar uma comportamento existente
 const updateComportamento = async function(comportamento){
     try {
         let sql = `update tbl_comportamento set comportamento = '${comportamento.comportamento}' where id = ${comportamento.id} `
 
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma comportamento existente
 const deleteComportamento = async function(id){
     try {
 
         let sql = `delete from tbl_comportamento where id=${id}`
 
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
 //Função para retornar todas as comportamento do banco de dados
 const selectAllComportamento = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_comportamento order by id desc'
 
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
 //Função para buscar uma comportamento pelo ID
 const selectByIdComportamento = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_comportamento where id=${id} `
 
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
     insertComportamento,
     updateComportamento,
     deleteComportamento,
     selectAllComportamento,
     selectByIdComportamento
 }