/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 29/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e saude code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const saudeDAO = require('../../model/DAO/saude.js')

//Função para inserir uma nova saude
const inserirSaude = async function(saude, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            saude.saude            == '' || saude.saude            == null || saude.saude            == undefined || saude.saude.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//saude code 400
         }else{
                //encaminhando os dados da saude para o DAO realizar o insert no Banco de dados
                let resultsaude = await saudeDAO.insertSaude(saude)

                if(resultsaude){
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

//Função para atualizar uma saude existente
const atualizarSaude = async function(id, saude, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               saude.saude            == '' || saude.saude            == null || saude.saude            == undefined || saude.saude.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//saude code 400
                }else{
                    //Verificar se o ID existe
                    let result = await saudeDAO.selectByIdSaude(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            saude.id = id
                            let resultsaude = await saudeDAO.updateSaude(saude)

                            if(resultsaude){
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

//Função para excluir uma saude existente
const excluirSaude = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultsaude = await saudeDAO.selectByIdSaude(id)
        if(resultsaude!= false || typeof(resultsaude)== "object"){
            if(resultsaude.length > 0){
                //delete
                let result = await saudeDAO.deleteSaude(id)

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
//Função para retornar uma lista de músicas
const listarSaude = async function(){
    try {

        //Criando um Objeto JSON
        let dadossaude = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultSaude = await saudeDAO.selectAllSaude()

        if(resultSaude != false){
            if(resultSaude.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadossaude.status = true
                dadossaude.status_code = 200,
                dadossaude.items = resultSaude.length
                dadossaude.saude = resultSaude

                return dadossaude

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

//Função para buscar uma saude pelo ID
const buscarSaude = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosaude = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultSaude = await saudeDAO.selectByIdSaude(id)

            if(resultSaude != false || typeof(resultSaude) == 'object'){
                if(resultSaude.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosaude.status = true
                    dadosaude.status_code = 200
                    dadosaude.saude = resultSaude
    
                    return dadosaude
    
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
    inserirSaude,
    atualizarSaude,
    excluirSaude,
    listarSaude,
    buscarSaude
}