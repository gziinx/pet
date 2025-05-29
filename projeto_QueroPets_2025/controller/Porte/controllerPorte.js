/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 27/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e porte code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const porteDAO = require('../../model/DAO/porte.js')

//Função para inserir uma nova porte
const inserirPorte = async function(porte, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' ) 
        
         { 
            if(
            porte.porte            == '' || porte.porte            == null || porte.porte            == undefined || porte.porte.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//porte code 400
         }else{
                //encaminhando os dados da porte para o DAO realizar o insert no Banco de dados
                let resultporte = await porteDAO.insertPorte(porte)
                if(resultporte){
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

//Função para atualizar uma porte existente
const atualizarPorte = async function(id, porte, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                porte.porte            == '' || porte.porte            == null || porte.porte            == undefined || porte.porte.length             > 100 ||
                id     == '' || id     == null || id     == undefined || isNaN(id) || id <=0
               )
                {
                    
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await porteDAO.selectByIdPorte(id)
                  
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            porte.id = id
                            let resultporte = await porteDAO.updatePorte(porte)

                            if(resultporte){
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

//Função para excluir uma porte existente
const excluirPorte = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultporte = await porteDAO.selectByIdPorte(id)
        if(resultporte!= false || typeof(resultporte)== "object"){
            if(resultporte.length > 0){
                //delete
                let result = await porteDAO.deletePorte(id)

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
const listarPorte = async function(){
    try {

        //Criando um Objeto JSON
        let dadosporte = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultPorte = await porteDAO.selectAllPorte()

        if(resultPorte != false){
            if(resultPorte.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadosporte.status = true
                dadosporte.status_code = 200,
                dadosporte.items = resultPorte.length
                dadosporte.porte = resultPorte

                return dadosporte

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

//Função para buscar uma porte pelo ID
const buscarPorte = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosporte = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultPorte = await porteDAO.selectByIdPorte(id)

            if(resultPorte != false || typeof(resultPorte) == 'object'){
                if(resultPorte.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosporte.status = true
                    dadosporte.status_code = 200
                    dadosporte.porte = resultPorte
    
                    return dadosporte
    
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
    inserirPorte,
    atualizarPorte,
    excluirPorte,
    listarPorte,
    buscarPorte
}