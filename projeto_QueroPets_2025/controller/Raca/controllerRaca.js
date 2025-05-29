/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 27/05/2025
* Autor: Felipe
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const racaDAO = require('../../model/DAO/raca.js')

//Função para inserir uma nova status
const inserirRaca = async function(raca, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
                raca.raca            == '' || raca.raca            == null || raca.raca            == undefined || raca.raca.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da status para o DAO realizar o insert no Banco de dados
                let result = await racaDAO.insertRaca(raca)

                if(result){
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
const atualizarRaca = async function(id, raca, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                raca.raca            == '' || raca.raca            == null || raca.raca            == undefined || raca.raca.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await racaDAO.selectByIdRaca(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            raca.id = id
                            let resultRaca = await racaDAO.updateRaca(raca)

                            if(resultRaca){
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
const excluirRaca = async function(raca){
   try {

    let id = raca

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultraca = await racaDAO.selectByIdRaca(id)
        if(resultraca!= false || typeof(resultraca)== "object"){
            if(resultraca.length > 0){
                //delete
                let result = await racaDAO.deleteRaca(id)

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
const listarRaca = async function(){
    try {
        //Criando um Objeto JSON
        let dadosRaca = {}

        //Chama a função para retornar as statuss do banco de dados
        let resultRaca = await racaDAO.selectAllRaca()

        if(resultRaca != false){
            if(resultRaca.length > 0){
                //Cria um JSON para colocar o ARRAY de statuss
                dadosRaca.status = true
                dadosRaca.status_code = 200,
                dadosRaca.items = resultRaca.length
                dadosRaca.raca = resultRaca

                return dadosRaca

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
const buscarRaca = async function(raca) {
    try {
        let id = raca

        // Objeto JSON
        let dadosRaca = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultRaca = await racaDAO.selectByIdRaca(id)

            if(resultRaca != false || typeof(resultRaca) == 'object'){
                if(resultRaca.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosRaca.status = true
                    dadosRaca.status_code = 200,
                    dadosRaca.raca = resultRaca

                    return dadosRaca
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
    inserirRaca,
    atualizarRaca,
    excluirRaca,
    listarRaca,
    buscarRaca
}