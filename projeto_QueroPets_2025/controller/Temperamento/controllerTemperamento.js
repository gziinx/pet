/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 27/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e temperamento code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const temperamentoDAO = require('../../model/DAO/temperamento.js')

//Função para inserir uma nova temperamento
const inserirTemperamento = async function(temperamento, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            temperamento.temperamento            == '' || temperamento.temperamento            == null || temperamento.temperamento            == undefined || temperamento.temperamento.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//temperamento code 400
         }else{
                //encaminhando os dados da temperamento para o DAO realizar o insert no Banco de dados
                let resulttemperamento = await temperamentoDAO.insertTemperamento(temperamento)

                if(resulttemperamento){
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

//Função para atualizar uma temperamento existente
const atualizarTemperamento = async function(id, temperamento, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               temperamento.temperamento            == '' || temperamento.temperamento            == null || temperamento.temperamento            == undefined || temperamento.temperamento.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//temperamento code 400
                }else{
                    //Verificar se o ID existe
                    let result = await temperamentoDAO.selectByIdTemperamento(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            temperamento.id = id
                            let resulttemperamento = await temperamentoDAO.updateTemperamento(temperamento)

                            if(resulttemperamento){
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

//Função para excluir uma temperamento existente
const excluirTemperamento = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resulttemperamento = await temperamentoDAO.selectByIdTemperamento(id)
        if(resulttemperamento!= false || typeof(resulttemperamento)== "object"){
            if(resulttemperamento.length > 0){
                //delete
                let result = await temperamentoDAO.deleteTemperamento(id)

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
const listarTemperamento = async function(){
    try {

        //Criando um Objeto JSON
        let dadosTemperamento = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultTemperamento = await temperamentoDAO.selectAllTemperamento()

        if(resultTemperamento != false){
            if(resultTemperamento.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadosTemperamento.status = true
                dadosTemperamento.status_code = 200,
                dadosTemperamento.items = resultTemperamento.length
                dadosTemperamento.temperamento = resultTemperamento

                return dadosTemperamento

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

//Função para buscar uma temperamento pelo ID
const buscarTemperamento = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosTemperamento = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultTemperamento = await temperamentoDAO.selectByIdTemperamento(id)

            if(resultTemperamento != false || typeof(resultTemperamento) == 'object'){
                if(resultTemperamento.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosTemperamento.status = true
                    dadosTemperamento.status_code = 200,
                    dadosTemperamento.temperamento = resultTemperamento

                    return dadosTemperamento
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
    inserirTemperamento,
    atualizarTemperamento,
    excluirTemperamento,
    listarTemperamento,
    buscarTemperamento
}