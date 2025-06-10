/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de petSaude no Banco de dados
* Data: 5/06/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

 //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()
 
 //Função para inserir uma nova petSaude
 const insertPetSaude = async function(petSaude){
     try{
         let sql  = `insert into tbl_pet_saude (
                                         id_pet,
                                         id_saude
                                         ) 
                                     values 
                                         ( 
                                         ${petSaude.id_pet},
                                         ${petSaude.id_saude}
                                         )`

                                            // console.log(sql); 
         
         //Await só vai funcionar se na função estiver com o async
         //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
         let result  = await prisma.$executeRawUnsafe(sql)
        //  console.log(result);
        console.log(result);
         if(result)
             return  true
         else
             return false//Bug no Banco de dados
         
         }catch(error){
             return false//Bug de programação
     }
 
 }
 //Função para atualizar uma petSaude existente
 const updatePetSaude = async function(petSaude){
     try {
         let sql = `update tbl_pet_saude set id_pet = ${petSaude.id_pet},
                                                              ${petSaude.id_saude}
                     where id = ${petSaude.id} `
 
         let  result = await prisma.$executeRawUnsafe(sql)
 
         if(result)
             return true
         else
             return false
         
     } catch (error) {
         return false
     }
 }
 //Função para excluir uma petSaude existente
 const deletePetSaude = async function(id){
     try {
 
         let sql = `delete from tbl_pet_saude where id_pet =${id}`
 
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
 //Função para retornar todas as petSaude do banco de dados
 const selectAllPetSaude = async function(){
     try {
 
         //Script SQL
         let sql = 'select * from tbl_pet_saude order by id desc'
 
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
 //Função para buscar uma petSaude pelo ID
 const selectByIdPetSaude = async function(number) {
     try {
         // Recebe o ID
         let id = number 
         
         // Script SQL 
         let sql = `select * from tbl_pet_saude where id=${id} `
 
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
 
 //Função para retornar os filmes pelo genero
 const selectPetSaude = async function(idSaude){
    try {
        let sql = `
            SELECT tbl_pet.* 
            FROM tbl_pet
            INNER JOIN tbl_pet_saude
                ON tbl_pet.id = tbl_pet_saude.id_pet
            WHERE tbl_pet_saude.id_saude = ${idSaude}
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        console.error("Erro ao buscar pets por comportamento:", error)
        return false
    }
}
   
   //Função para retornar os generos pelo Filme
   const selectSaudePet = async function(idPet){
    try {
        let sql = `
            SELECT tbl_saude.* 
            FROM tbl_saude
            INNER JOIN tbl_pet_saude
                ON tbl_saude.id = tbl_pet_saude.id_saude
            WHERE tbl_pet_saude.id_pet = ${idPet}
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        console.error("Erro ao buscar comportamentos por pet:", error)
        return false
    }
}
 
 
 module.exports = {
     insertPetSaude,
     updatePetSaude,
     deletePetSaude,
     selectAllPetSaude,
     selectByIdPetSaude,
     selectPetSaude,
     selectSaudePet
 }