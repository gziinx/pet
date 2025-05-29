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
const especieDAO = require('../../model/DAO/especie.js')

//Função para inserir uma nova status
const inserirEspecie = async function(especie, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
                especie.especie            == '' || especie.especie            == null || especie.especie            == undefined || especie.especie.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da status para o DAO realizar o insert no Banco de dados
                let result = await especieDAO.insertEspecie(especie)

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
const atualizarEspecie = async function(id, especie, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                especie.especie            == '' || especie.especie            == null || especie.especie            == undefined || especie.especie.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await especieDAO.selectByIdEspecie(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            especie.id = id
                            let resultEspecie = await especieDAO.updateEspecie(especie)

                            if(resultEspecie){
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
const excluirEspecie = async function(especie){
   try {

    let id = especie

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultEspecie = await especieDAO.selectByIdEspecie(id)
        if(resultEspecie!= false || typeof(resultEspecie)== "object"){
            if(resultEspecie.length > 0){
                //delete
                let result = await especieDAO.deleteEspecie(id)

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
const listarEspecie = async function(){
    try {
        //Criando um Objeto JSON
        let dadosEspecie = {}

        //Chama a função para retornar as statuss do banco de dados
        let resultEspecie = await especieDAO.selectAllEspecie()

        if(resultEspecie != false){
            if(resultEspecie.length > 0){
                //Cria um JSON para colocar o ARRAY de statuss
                dadosEspecie.status = true
                dadosEspecie.status_code = 200,
                dadosEspecie.items = resultEspecie.length
                dadosEspecie.especie = resultEspecie

                return dadosEspecie

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
const buscarEspecie = async function(especie) {
    try {
        let id = especie

        // Objeto JSON
        let dadosEspecie = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultEspecie = await especieDAO.selectByIdEspecie(id)

            if(resultEspecie != false || typeof(resultEspecie) == 'object'){
                if(resultEspecie.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosEspecie.status = true
                    dadosEspecie.status_code = 200,
                    dadosEspecie.especie = resultEspecie

                    return dadosEspecie
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
    inserirEspecie,
    atualizarEspecie,
    excluirEspecie,
    listarEspecie,
    buscarEspecie
}