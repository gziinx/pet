/**********************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * Data: 13/06/2025
 * Autor: Eduara
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const petComportamentoDAO = require('../../model/DAO/pet_comportamento.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirPetComportamento = async function(petComportamento, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    petComportamento.id_pet       == ''   || petComportamento.id_pet     == undefined    || petComportamento.id_pet  == null || isNaN(petComportamento.id_pet)  || petComportamento.id_pet <=0 ||
                    petComportamento.id_comportamento      == ''   || petComportamento.id_comportamento    == undefined    || petComportamento.id_comportamento == null || isNaN(petComportamento.id_comportamento) || petComportamento.id_comportamento<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultpetComportamento = await petComportamentoDAO.insertPetComportamento(petComportamento)

                    if(resultpetComportamento)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarpetComportamento = async function(id, petComportamento, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    petComportamento.id_pet              == ''           || petComportamento.id_pet     == undefined    || petComportamento.id_pet  == null || isNaN(petComportamento.id_pet)  || petComportamento.id_pet <=0 ||
                    petComportamento.id_comportamento             == ''           || petComportamento.id_comportamento    == undefined    || petComportamento.id_comportamento == null || isNaN(petComportamento.id_comportamento) || petComportamento.id_comportamento<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultpetComportamento = await petComportamentoDAO.selectByIdPetComportamento(parseInt(id))

                    if(resultpetComportamento != false || typeof(resultpetComportamento) == 'object'){
                        if(resultpetComportamento.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            petComportamento.id = parseInt(id)

                            let result = await petComportamentoDAO.updatePetComportamento(petComportamento)

                            if(result){
                                return message.SUCCESS_UPDATE_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NO_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirpetComportamento = async function(id){
    console.log()
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Função que verifica se  ID existe no BD
            let resultpetComportamento = await petComportamentoDAO.selectByIdPetComportamento(parseInt(id))

            if(resultpetComportamento != false || typeof(resultpetComportamento) == 'object'){
                //Se existir, faremos o delete
                if(resultpetComportamento.length > 0){
                    //delete
                    let result = await petComportamentoDAO.deletePetComportamento(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NO_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarPetComportamento = async function(){
    try {
        //Objeto do tipo JSON
        let dadospetComportamento = {}
        //Chama a função para retornar os generos cadastrados
        let resultpetComportamento = await petComportamentoDAO.selectAllPetComportamento()

        if(resultpetComportamento != false || typeof(resultpetComportamento) == 'object'){
            if(resultpetComportamento.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadospetComportamento.status = true
                dadospetComportamento.status_code = 200
                dadospetComportamento.items = resultpetComportamento.length
                dadospetComportamento.pet = resultpetComportamento

                return dadospetComportamento
            }else{
                return message.ERROR_NO_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarPetComportamento = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadospetComportamento = {}

            let resultpetComportamento = await petComportamentoDAO.selectByIdPetComportamento(parseInt(id))
            
            if(resultpetComportamento != false || typeof(resultpetComportamento) == 'object'){
                if(resultpetComportamento.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadospetComportamento.status = true
                    dadospetComportamento.status_code = 200
                    dadospetComportamento.pet = resultpetComportamento

                    return dadosFimeGenero //200
                }else{
                    return message.ERROR_NO_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos relacionados a um filme
const buscarComportamentoPet = async function(idPet){
    try {
        if(idPet == '' || idPet == undefined || idPet == null || isNaN(idPet) || idPet <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadospetComportamento = {} 

            let resultgenero = await petComportamentoDAO.selectComportamentoPet(parseInt(idPet))
            
            if(resultgenero && Array.isArray(resultgenero) && resultgenero.length > 0){
               
                dadospetComportamento.status = true
                dadospetComportamento.status_code = 200
                dadospetComportamento.comportamento = resultgenero 

                return dadospetComportamento // 200
            }else{
           
                return message.ERROR_NO_FOUND // 404
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirPetComportamento,
    atualizarpetComportamento,
    excluirpetComportamento,
    listarPetComportamento,
    buscarPetComportamento,
    buscarComportamentoPet
}