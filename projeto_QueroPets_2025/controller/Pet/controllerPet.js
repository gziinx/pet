/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de pet
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const petDAO = require('../../model/DAO/pet.js')
const petComportamentoDAO = require('../../model/DAO/pet_comportamento.js');

const controllerPorte = require('../Porte/controllerPorte.js')
const controllerStatus = require('../Status/controllerStatus.js')
const controllerRaca = require('../Raca/controllerRaca.js')
const controllerSexo = require('../Sexo/controllerSexo.js')
const controllerTemperamento = require('../Temperamento/controllerTemperamento.js')
const controllerEspecie = require('../Especie/controllerEspecie.js')
const controllerSaude = require('../Saude/controllerSaude.js')
const controllerpetComportamento = require('../Pet/controllerComportPet.js')

// função para tratar a inserção de um novo pet no DAO
const inserirPet = async function(pet, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                pet.nome              == '' || pet.nome              == undefined || pet.nome              == null || pet.nome.length                    > 100 ||
                pet.data_nascimento   == '' || pet.data_nascimento   == undefined || pet.data_nascimento   == null || pet.data_nascimento.length         > 10  ||
                pet.foto              == '' || pet.foto              == undefined || pet.foto              == null || pet.foto.length                    > 100 ||
                pet.necessidades      == '' || pet.necessidades      == undefined || pet.necessidades      == null || pet.necessidades.length            > 200 ||
                pet.id_porte          == '' || pet.id_porte          == undefined || pet.id_porte          == null || isNaN(pet.id_porte)                      || pet.id_porte         <= 0    || 
                pet.id_status         == '' || pet.id_status         == undefined || pet.id_status         == null || isNaN(pet.id_status)                     || pet.id_status        <= 0    || 
                pet.id_raca           == '' || pet.id_raca           == undefined || pet.id_raca           == null || isNaN(pet.id_raca)                       || pet.id_raca          <= 0    ||
                pet.id_sexo           == '' || pet.id_sexo           == undefined || pet.id_sexo           == null || isNaN(pet.id_sexo)                       || pet.id_sexo          <= 0    ||
                pet.id_temperamento   == '' || pet.id_temperamento   == undefined || pet.id_temperamento   == null || isNaN(pet.id_temperamento)               || pet.id_temperamento  <= 0    ||
                pet.id_especie        == '' || pet.id_especie        == undefined || pet.id_especie        == null || isNaN(pet.id_especie)                    || pet.id_especie       <= 0    ||
                pet.id_saude          == '' || pet.id_saude          == undefined || pet.id_saude          == null || isNaN(pet.id_saude)                      || pet.id_saude         <= 0   
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERROR_REQUIRED_FIELDS //400
           }else{
               let resultpet= await petDAO.insertPet(pet)
       
                // associando generos
                // verificando se o pet foi inserido no banco
               if (resultpet) {
               
                //verificando se tem algum campo chamado "genero" para ser add e se esse campo retorna um array
                if (pet.comportamento && Array.isArray(pet.comportamento)) {
                    // Obtém o ID do pet inserido
                    let petInserido = await petDAO.selectLastInsertId()
                    //acessa a propriedade id dentro do objeto retornado
                    let idpet = petInserido[0].id
                    
                    // Para cada gênero no array do body, cria uma variavel comportamento na lista de pet 
                    for (let comportamento of pet.comportamento) {
                        // verifica se o campo "comportamento" possui um atributo id e se é int
                        if (comportamento.id && !isNaN(comportamento.id)) {
                            // adicionando os ids na tbl_pet_Comportamento
                            let petComportamento = {
                                id_pet: idpet,
                                id_Comportamento: comportamento.id
                            }
                            await petComportamentoDAO.insertPetComportamento(petComportamento);
                        }
                    }
                }
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
            }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

        
    }catch(error){
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
        
}

// função para tratar a atualização de um pet no DAO
const atualizarPet = async function(id, pet, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                pet.nome              == ''  || pet.nome              == undefined || pet.nome              == null || pet.nome.length                    > 100 ||
                pet.data_nascimento   == ''  || pet.data_nascimento   == undefined || pet.data_nascimento   == null || pet.data_nascimento.length           > 10||
                pet.foto              == ''  || pet.foto              == undefined || pet.foto              == null || pet.foto.length                     >100 ||
                pet.necessidades       == '' || pet.necessidades      == undefined || pet.necessidades      == null || pet.necessidades.length             > 200 ||
                pet.id_porte          == ''  || pet.id_porte          == undefined || pet.id_porte          == null || isNaN(pet.id_porte)                      || pet.id_porte         <= 0    || 
                pet.id_status         == ''  || pet.id_status         == undefined || pet.id_status         == null || isNaN(pet.id_status)                     || pet.id_status        <= 0    || 
                pet.id_raca           == ''  || pet.id_raca           == undefined || pet.id_raca           == null || isNaN(pet.id_raca)                       || pet.id_raca          <= 0    ||
                pet.id_sexo           == ''  || pet.id_sexo           == undefined || pet.id_sexo           == null || isNaN(pet.id_sexo)                       || pet.id_sexo          <= 0    ||
                pet.id_temperamento   == ''  || pet.id_temperamento   == undefined || pet.id_temperamento   == null || isNaN(pet.id_temperamento)               || pet.id_temperamento  <= 0    ||
                pet.id_especie        == ''  || pet.id_especie        == undefined || pet.id_especie        == null || isNaN(pet.id_especie)                    || pet.id_especie       <= 0    ||
                pet.id_saude          == ''  || pet.id_saude          == undefined || pet.id_saude          == null || isNaN(pet.id_saude)                      || pet.id_saude         <= 0   
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERROR_REQUIRED_FIELDS //400
           }else{

               //validação para verificar se o id existe no banco
               let resultPet = await petDAO.selectByIdPet(parseInt(id))
               
               if(resultPet != false || typeof(resultPet) == 'object'){

                    if(resultPet.length > 0){

                        //update
                        //adiciona o id do pet no json com os dados
                        pet.id = parseInt(id)
                        
                        let result = await petDAO.updatePet(pet)

                        if(result){
                            return message.SUCCESS_UPDATE_ITEM //200
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else{
                        return message.ERROR_NO_FOUND // 404
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

// função para tratar a exclusão de um pet no DAO
const excluirPet = async function(id){
    try {


        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultPet = await petDAO.selectByIdPet(parseInt(id))
            if(resultPet != false || typeof(resultPet) == 'object'){

                //se existir, faremos o delete
                if (resultPet.length > 0) {
                    //delete do genero na nxn
                    let deletePet = await petComportamentoDAO.deletePetComportamento(id);
                    if (deletePet) {
                        //delete do filme
                        let result = await petDAO.deletePet(parseInt(id))

                        if (result) {
                            return message.SUCCESS_DELETED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    }   
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //404
                }
            }else{
                return message.ERROR_NO_FOUND //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de uma lista de pets no DAO
const listarPet = async function(){
        try {

            let arraypets = []
            //objeto do tipo JSON
            let dadospet = {}

            //chama a funçção para retornar os pets cadastrados
            let resultpet = await petDAO.selectAllPets()

            if(resultpet != false || typeof(resultpet) == 'object'){
                if(resultpet.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadospet.status = true
                    dadospet.status_code = 200
                    dadospet.items = resultpet.length

                    //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await
                    for(const itempet of resultpet){
                        /* Monta o objeto da classificação para retornar no pet */
                            //Busca os dados da classificação na controller de classificacao
                            let dadosporte = await controllerPorte.buscarPorte(itempet.id_porte)
                            //Adiciona um atributo classificação no JSON de pets e coloca os dados da classificação
                            itempet.porte = dadosporte.porte
                            //Remover o id do JSON
                            delete itempet.id_porte
                        
                            let dadosStatus = await controllerStatus.buscarStatus(itempet.id_status)
                            itempet.status = dadosStatus.status
                            delete itempet.id_status

                            let dadosRaca = await controllerRaca.buscarRaca(itempet.id_raca)
                            itempet.raca = dadosRaca.raca
                            delete itempet.id_raca

                            let dadosSexo = await controllerSexo.buscarSexo(itempet.id_sexo)
                            itempet.sexo = dadosSexo.sexo
                            delete itempet.id_sexo

                            let dadosTemperamento = await controllerTemperamento.buscarTemperamento(itempet.id_temperamento)
                            itempet.temperamento = dadosTemperamento.temperamento
                            delete itempet.id_temperamento

                            let dadosEspecie = await controllerEspecie.buscarEspecie(itempet.id_especie)
                            itempet.especie = dadosEspecie.especie
                            delete itempet.id_especie

                            let dadosSaude = await controllerSaude.buscarSaude(itempet.id_saude)
                            itempet.saude = dadosSaude.saude
                            delete itempet.id_saude

                            // fazendo interação com a tbl_pet_genero
                            let dadosComportamento = await controllerpetComportamento.buscarComportamentoPet(itempet.id)
                            console.log(dadosComportamento)
                            itempet.comportamento = dadosComportamento.comportamento

                        arraypets.push(itempet)
     
                    }
                    dadospet.pets = arraypets

                    return dadospet

                }else{
                    return message.ERROR_NO_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } catch (error) {
            console.log(error);
            
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

// função para tratar o retorno de um pet filtrando pelo ID do DAO
const buscarPet = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELDS //400

        } else {

            let arraypets= []
            let dadospet = {}

            let resultpet= await petDAO.selectByIdPet(parseInt(id))

            if(resultpet != false || typeof(resultpet) == 'object'){

                if(resultpet.length > 0){

                    dadospet.status = true
                    dadospet.status_code = 200
                    for(const itempet of resultpet){
                        /* Monta o objeto da classificação para retornar no pet */
                            //Busca os dados da classificação na controller de classificacao
                            let dadosporte = await controllerPorte.buscarPorte(itempet.id_porte)
                            //Adiciona um atributo classificação no JSON de pets e coloca os dados da classificação
                            itempet.porte = dadosporte.porte
                            //Remover o id do JSON
                            delete itempet.id_porte
                        
                            let dadosStatus = await controllerStatus.buscarStatus(itempet.id_status)
                            itempet.status = dadosStatus.status
                            delete itempet.id_status

                            let dadosRaca = await controllerRaca.buscarRaca(itempet.id_raca)
                            itempet.raca = dadosRaca.raca
                            delete itempet.id_raca

                            let dadosSexo = await controllerSexo.buscarSexo(itempet.id_sexo)
                            itempet.sexo = dadosSexo.sexo
                            delete itempet.id_sexo

                            let dadosTemperamento = await controllerTemperamento.buscarTemperamento(itempet.id_temperamento)
                            itempet.temperamento = dadosTemperamento.temperamento
                            delete itempet.id_temperamento

                            let dadosEspecie = await controllerEspecie.buscarEspecie(itempet.id_especie)
                            itempet.especie = dadosEspecie.especie
                            delete itempet.id_especie

                            let dadosSaude = await controllerSaude.buscarSaude(itempet.id_saude)
                            itempet.saude = dadosSaude.saude
                            delete itempet.id_saude

                            // fazendo interação com a tbl_pet_genero
                            let dadosComportamento = await controllerpetComportamento.buscarComportamentoPet(itempet.id)
                           
                            itempet.comportamento = dadosComportamento.comportamento

                        arraypets.push(itempet)
     
                    }
                    dadospet.pets = arraypets

                    return dadospet
                }else{
                    return message.ERROR_NO_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirPet,
    atualizarPet,
    excluirPet,
    listarPet,
    buscarPet
}