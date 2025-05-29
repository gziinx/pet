/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 27/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const statusDAO = require('../../model/DAO/status.js')

//Função para inserir uma nova status
const inserirStatus = async function(status, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            status.status            == '' || status.status            == null || status.status            == undefined || status.status.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da status para o DAO realizar o insert no Banco de dados
                let resultstatus = await statusDAO.insertStatus(status)

                if(resultstatus){
                    return message.SUCCESS_CREATED_ITEM // 201
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar uma status existente
const atualizarStatus = async function(id, status, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               status.status            == '' || status.status            == null || status.status            == undefined || status.status.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await statusDAO.selectByIdStatus(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            status.id = id
                            let resultstatus = await statusDAO.updateStatus(status)

                            if(resultstatus){
                                return message.SUCCESS_UPDATE_ITEM//200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL//500
                            }
                        }else{
                            return message.ERROR_NO_FOUND//404
                        }
                    }
                }

            }else{
                return message.ERROR_CONTENT_TYPE//415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//Função para excluir uma status existente
const excluirStatus = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultstatus = await statusDAO.selectByIdStatus(id)
        if(resultstatus!= false || typeof(resultstatus)== "object"){
            if(resultstatus.length > 0){
                //delete
                let result = await statusDAO.deleteStatus(id)

                if(result)
                    return message.SUCCESS_DELETED_ITEM//200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
            }else{
                return message.ERROR_NO_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }

    }
   } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
   }
}

//Função para retornar uma lista de músicas
const listarStatus = async function(){
    try {
        //Criando um Objeto JSON
        let dadosstatus = {}

        //Chama a função para retornar as statuss do banco de dados
        let resultstatus = await statusDAO.selectAllStatus()

        if(resultstatus != false){
            if(resultstatus.length > 0){
                //Cria um JSON para colocar o ARRAY de statuss
                dadosstatus.status = true
                dadosstatus.status_code = 200,
                dadosstatus.items = resultstatus.length
                dadosstatus.status = resultstatus

                return dadosstatus

            }else{
                return message.ERROR_NO_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

//Função para buscar uma status pelo ID
const buscarStatus = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosstatus = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultstatus = await statusDAO.selectByIdStatus(id)

            if(resultstatus != false || typeof(resultstatus) == 'object'){
                if(resultstatus.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosstatus.status = true
                    dadosstatus.status_code = 200,
                    dadosstatus.status = resultstatus

                    return dadosstatus
                }else{
                    return message.ERROR_NO_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirStatus,
    atualizarStatus,
    excluirStatus,
    listarStatus,
    buscarStatus
}