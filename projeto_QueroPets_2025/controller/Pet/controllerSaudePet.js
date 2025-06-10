/**********************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * Data: 05/06/2025
 * Autor: Eduara
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const petSaudeDAO = require('../../model/DAO/pet_saude.js')

//Função para tratar a inserção de um novo pet no DAO
const inserirPetSaude = async function(petSaude, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    petSaude.id_pet       == ''   || petSaude.id_pet     == undefined    || petSaude.id_pet   == null || isNaN(petSaude.id_pet)   || petSaude.id_pet   <= 0 ||
                    petSaude.id_saude     == ''   || petSaude.id_saude   == undefined    || petSaude.id_saude == null || isNaN(petSaude.id_saude) || petSaude.id_saude <= 0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultpetSaude = await petSaudeDAO.insertPetSaude(petSaude)

                    if(resultpetSaude)
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

//Função para tratar a atualização de um pet no DAO
const atualizarPetSaude = async function(id, petSaude, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                 == ''           || id                  == undefined    || id                == null || isNaN(id)                || id                <= 0 ||
                    petSaude.id_pet    == ''           || petSaude.id_pet     == undefined    || petSaude.id_pet   == null || isNaN(petSaude.id_pet)   || petSaude.id_pet   <= 0 ||
                    petSaude.id_saude  == ''           || petSaude.id_saude   == undefined    || petSaude.id_saude == null || isNaN(petSaude.id_saude) || petSaude.id_saude <= 0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultpetSaude = await petSaudeDAO.selectByIdPetSaude(parseInt(id))

                    if(resultpetSaude != false || typeof(resultpetSaude) == 'object'){
                        if(resultpetSaude.length > 0 ){
                            //Update
                            //Adiciona o ID do pet no JSON com os dados
                            petSaude.id = parseInt(id)

                            let result = await petSaudeDAO.updatePetSaude(petSaude)

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

//Função para tratar a exclusão de um pet no DAO
const excluirPetSaude = async function(id){
    console.log()
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Função que verifica se  ID existe no BD
            let resultpetSaude = await petSaudeDAO.selectByIdPetSaude(parseInt(id))

            if(resultpetSaude != false || typeof(resultpetSaude) == 'object'){
                //Se existir, faremos o delete
                if(resultpetSaude.length > 0){
                    //delete
                    let result = await petSaudeDAO.deletePetSaude(parseInt(id))

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

//Função para tratar o retorno de uma lista de pets do DAO
const listarPetSaude = async function(){
    try {
        //Objeto do tipo JSON
        let dadospetSaude = {}
        //Chama a função para retornar os pets cadastrados
        let resultpetSaude = await petSaudeDAO.selectAllPetSaude()

        if(resultpetSaude != false || typeof(resultpetSaude) == 'object'){
            if(resultpetSaude.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadospetSaude.status = true
                dadospetSaude.status_code = 200
                dadospetSaude.items = resultpetSaude.length
                dadospetSaude.saude = resultpetSaude

                return dadospetSaude
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

//Função para tratar o retorno de um pet filtrando pelo ID do DAO
const buscarPetSaude = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadospetSaude = {}

            let resultpetSaude = await petSaudeDAO.selectByIdPetSaude(parseInt(id))
            
            if(resultpetSaude != false || typeof(resultpetSaude) == 'object'){
                if(resultpetSaude.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadospetSaude.status = true
                    dadospetSaude.status_code = 200
                    dadospetSaude.saude = resultpetSaude

                    return dadosFimepet //200
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

//Função para retornar os pets relacionados a um filme
const buscarSaudePet = async function(idPet){
    try {
        if(idPet == '' || idPet == undefined || idPet == null || isNaN(idPet) || idPet <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadospetSaude = {} 

            let resultpet = await petSaudeDAO.selectSaudePet(parseInt(idPet))
            
            if(resultpet && Array.isArray(resultpet) && resultpet.length > 0){
               
                dadospetSaude.status = true
                dadospetSaude.status_code = 200
                dadospetSaude.saude = resultpet 

                return dadospetSaude // 200
            }else{
           
                return message.ERROR_NO_FOUND // 404
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirPetSaude,
    atualizarPetSaude,
    excluirPetSaude,
    listarPetSaude,
    buscarPetSaude,
    buscarSaudePet
}