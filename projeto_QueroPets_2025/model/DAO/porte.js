/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de porte no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova porte
 const insertPorte = async function(porte){
     try{
         let sql  = `insert into tbl_porte (
                         porte
                    ) values ( 
                         '${porte.porte}'
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
 //Função para atualizar uma porte existente
 const updatePorte = async function(porte){
     try {
        
         let sql = `update tbl_porte set porte = '${porte.porte}' where id = '${porte.id}' `
         
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma porte existente
 const deletePorte = async function(id){
     try {
        
         let sql = `delete from tbl_porte where id=${id}`
 
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
 //Função para retornar todas as porte do banco de dados
 const selectAllPorte = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_porte order by id desc'
 
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
 //Função para buscar uma porte pelo ID
 const selectByIdPorte = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_porte where id=${id} `
 
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
     insertPorte,
     updatePorte,
     deletePorte,
     selectAllPorte,
     selectByIdPorte
 }