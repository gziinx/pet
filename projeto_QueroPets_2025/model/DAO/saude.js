/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de status no Banco de dados
* Data: 29/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova saude
 const insertSaude = async function(saude){
     try{
         let sql  = `insert into tbl_saude (
                         saude
                        )  values ( 
                         '${saude.saude}'
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
 //Função para atualizar uma saude existente
 const updateSaude = async function(saude){
     try {
         let sql = `update tbl_saude set saude = '${saude.saude}' where id = ${saude.id} `
 
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma saude existente
 const deleteSaude = async function(id){
     try {
 
         let sql = `delete from tbl_saude where id=${id}`
 
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
 //Função para retornar todas as saude do banco de dados
 const selectAllSaude = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_saude order by id desc'
 
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
 //Função para buscar uma saude pelo ID
 const selectByIdSaude = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_saude where id=${id} `
 
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
     insertSaude,
     updateSaude,
     deleteSaude,
     selectAllSaude,
     selectByIdSaude
 }