/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 27/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e comportamento code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const comportamentoDAO = require('../../model/DAO/comportamento.js')

//Função para inserir uma nova comportamento
const inserirComportamento = async function(comportamento, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            comportamento.comportamento            == '' || comportamento.comportamento            == null || comportamento.comportamento            == undefined || comportamento.comportamento.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//comportamento code 400
         }else{
                //encaminhando os dados da comportamento para o DAO realizar o insert no Banco de dados
                let resultcomportamento = await comportamentoDAO.insertComportamento(comportamento)

                if(resultcomportamento){
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

//Função para atualizar uma comportamento existente
const atualizarComportamento = async function(id, comportamento, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               comportamento.comportamento            == '' || comportamento.comportamento            == null || comportamento.comportamento            == undefined || comportamento.comportamento.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//comportamento code 400
                }else{
                    //Verificar se o ID existe
                    let result = await comportamentoDAO.selectByIdComportamento(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            comportamento.id = id
                            let resultcomportamento = await comportamentoDAO.updateComportamento(comportamento)

                            if(resultcomportamento){
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

//Função para excluir uma comportamento existente
const excluirComportamento = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultcomportamento = await comportamentoDAO.selectByIdComportamento(id)
        if(resultcomportamento!= false || typeof(resultcomportamento)== "object"){
            if(resultcomportamento.length > 0){
                //delete
                let result = await comportamentoDAO.deleteComportamento(id)

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
const listarComportamento = async function(){
    try {
        //Criando um Objeto JSON
        let dadosComp = {}

        //Chama a função para retornar as statuss do banco de dados
        let resultComp = await comportamentoDAO.selectAllComportamento()

        if(resultComp != false){
            if(resultComp.length > 0){
                //Cria um JSON para colocar o ARRAY de statuss
                dadosComp.status = true
                dadosComp.status_code = 200,
                dadosComp.items = resultComp.length
                dadosComp.comportamentos = resultComp

                return dadosComp

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

//Função para buscar uma comportamento pelo ID
const buscarComportamento = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosComp = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultComp = await comportamentoDAO.selectByIdComportamento(id)

            if(resultComp != false || typeof(resultComp) == 'object'){
                if(resultComp.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosComp.status = true
                    dadosComp.status_code = 200,
                    dadosComp.comportamento = resultComp

                    return dadosComp
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
    inserirComportamento,
    atualizarComportamento,
    excluirComportamento,
    listarComportamento,
    buscarComportamento
}