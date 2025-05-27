/********************************************************************************************************************************
* Objetivo: Controller reponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 15/04/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const message = require('../../modulo/config.js')

const enderecoDAO = require('../../model/DAO/endereco.js')

const inserirEndereco = async function(endereco, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            endereco.cep            == '' || endereco.cep           == null || endereco.cep           == undefined || endereco.cep.length            > 12 ||
            endereco.estado          == '' || endereco.estado         == null || endereco.estado               == undefined ||  endereco.estado.length            > 24
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da endereco para o DAO realizar o insert no Banco de dados
                let resultendereco = await enderecoDAO.insertEndereco(endereco)
                
                if(resultendereco){
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
const atualizarEndereco = async function(id, endereco, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                endereco.cep            == '' || endereco.cep           == null || endereco.cep           == undefined || endereco.cep.length            > 12 ||
                endereco.estado          == '' || endereco.estado         == null || endereco.estado               == undefined ||  endereco.estado.length            > 24
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await enderecoDAO.selectByIdEndereco(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            endereco.id = id
                            let resultendereco = await enderecoDAO.updateEndereco(endereco)

                            if(resultendereco){
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

const excluirEndereco = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultendereco = await enderecoDAO.selectByIdEndereco(id)
        if(resultendereco!= false || typeof(resultendereco)== "object"){
            if(resultendereco.length > 0){
                //delete
                let result = await enderecoDAO.deleteEndereco(id)

                if(result)
                    return message.SUCCESS_DELETED_ITEM//200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
            }else{
                return message.ERROR_NOT_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }

    }
   } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
   }
}

const listarEndereco = async function(){
    try {
        //Criando um Objeto JSON
        let dadosEndereco = {}

        //Chama a função para retornar as enderecos do banco de dados
        let resultendereco = await enderecoDAO.selectAllEndereco()
        if(resultendereco != false){
            if(resultendereco.length > 0){
                //Cria um JSON para colocar o ARRAY de enderecos
                dadosEndereco.status = true
                dadosEndereco.status_code = 200,
                dadosEndereco.items = resultendereco.length
                dadosEndereco.endereco = resultendereco

                return dadosEndereco

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

const buscarEndereco = async function(id) {
    try {

        // Objeto JSON
        let dadosEndereco = {}

        if ( id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultendereco = await enderecoDAO.selectByIdEndereco(id)

            if(resultendereco != false || typeof(resultendereco) == 'object'){
                if(resultendereco.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosEndereco.status = true
                    dadosEndereco.status_code = 200,
                    dadosEndereco.endereco = resultendereco

                    return dadosEndereco
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
// console.log(buscarEndereco(1))

module.exports = {
    inserirEndereco,
    atualizarEndereco,
    excluirEndereco,
    listarEndereco,
    buscarEndereco
}