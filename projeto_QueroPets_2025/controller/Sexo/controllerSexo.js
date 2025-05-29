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
const sexoDAO = require('../../model/DAO/sexo.js')

//Função para inserir uma nova status
const inserirSexo = async function(sexo, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
                sexo.sexo            == '' || sexo.sexo            == null || sexo.sexo            == undefined || sexo.sexo.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da status para o DAO realizar o insert no Banco de dados
                let result = await sexoDAO.insertSexo(sexo)

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
const atualizarSexo = async function(id, sexo, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                sexo.sexo            == '' || sexo.sexo            == null || sexo.sexo            == undefined || sexo.sexo.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await sexoDAO.selectByIdSexo(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            sexo.id = id
                            let resultSexo = await sexoDAO.updateSexo(sexo)

                            if(resultSexo){
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
const excluirSexo = async function(sexo){
   try {

    let id = sexo

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultsexo = await sexoDAO.selectByIdSexo(id)
        if(resultsexo!= false || typeof(resultsexo)== "object"){
            if(resultsexo.length > 0){
                //delete
                let result = await sexoDAO.deleteSexo(id)

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
const listarSexo = async function(){
    try {
        //Criando um Objeto JSON
        let dadosSexo = {}

        //Chama a função para retornar as statuss do banco de dados
        let resultSexo = await sexoDAO.selectAllSexo()

        if(resultSexo != false){
            if(resultSexo.length > 0){
                //Cria um JSON para colocar o ARRAY de statuss
                dadosSexo.status = true
                dadosSexo.status_code = 200,
                dadosSexo.items = resultSexo.length
                dadosSexo.sexo = resultSexo

                return dadosSexo

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
const buscarSexo = async function(sexo) {
    try {
        let id = sexo

        // Objeto JSON
        let dadosSexo = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultSexo = await sexoDAO.selectByIdSexo(id)

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosSexo.status = true
                    dadosSexo.status_code = 200,
                    dadosSexo.sexo = resultSexo

                    return dadosSexo
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo
}