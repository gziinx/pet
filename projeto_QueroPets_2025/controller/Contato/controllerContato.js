/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Contato
 * Data: 22/05/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../../modulo/config')
const contatoDAO   = require('../../model/DAO/contato')

//Import das controller necessárias para fazer os relacionamentos
const controllerUsuario = require('../Usuario/ControllerUsuario')

//Funcão para tratar a inserção de um novo Contato no DAO
const inserirContato= async function (contato, contentType){
    
    try {

    if(String(contentType).toLocaleLowerCase() == 'application/json')
    {
    
        if(contato.telefone                       == ''   ||  contato.telefone             == undefined    || contato.telefone               == null     ||      contato.telefone.length > 100 || 
        contato.id_usuario                      == ''   ||  contato.id_usuario             == undefined    || contato.id_usuario               == null      
            
            
        )
        {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            //Chama a função para inserir no BD e aguarda o retorno da função 
            let result = await contatoDAO.insertContato(contato)

            if(result){
                return message.SUCCESS_CREATED_ITEM //201
            }else
            return message.ERROR_INTERNAL_SERVER //500
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        
}
} 

//Funcão para tratar a atualização de um novo filme no DAO
const atualizarContato = async function (id, contato, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
            {
            
                if(id                               == ''       ||  id                     == undefined          || id                       == null     ||   isNaN(id)                           || id <= 0      ||             
                contato.telefone                       == ''    ||  contato.telefone       == undefined          || contato.telefone         == null     ||      contato.telefone.length > 100    || 
                contato.id_usuario                      == ''   ||  contato.id_usuario     == undefined          || contato.id_usuario       == null  
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await contatoDAO.selectByIdContato(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //adiciona o ID do filme no JSON com os dados
                            contato.id = parseInt(id)

                            let result = await contatoDAO.updateContato(contato)
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

//Funcão para tratar a excluir de um novo filme no DAO
const excluirContato = async function (id){
    try {
  
        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
          return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if(id){
          let verificar = await contatoDAO.selectByIdContato(parseInt(id))
          console.log(verificar)
  
          if(verificar != false || typeof(verificar) == 'object'){
            //Se existir, faremos o delete
              if(verificar.length > 0){
                //delete
                let result= await contatoDAO.deleteContato(parseInt(id))
                console.log(result)
                  if(result){
                      return message.SUCCESS_DELETED_ITEM
                  }else {
                      return message.ERROR_NOT_DELETE
                  }
              }else {
                  return message.ERROR_NOT_DELETE 
              }
            }else {
              return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
          }else{
            return message.ERROR_REQUIRED_FIELDS
          } 
      }catch (error){
          return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
   }
}

//Funcão para tratar o retorno de filmes do DAO
const listarContato = async function(){
    try {

        let ContatoArray = []
        //Criando um Objeto JSON
        let dadosContatos = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultContato = await contatoDAO.selectAllContatos()

        if(resultContato != false){
            if(resultContato.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadosContatos.status = true
                dadosContatos.status_code = 200,
                dadosContatos.items = resultContato
                
                for (itemContato of resultContato) {
                    
                    let dadosUser = await controllerUsuario.buscarUsuario(itemContato.id_usuario)

                    itemContato.usuario = dadosUser.usuario

                    delete itemContato.id_usuario

                    ContatoArray.push(itemContato)
                }
                console.log(ContatoArray)
                dadosContatos.contatos = ContatoArray

                return dadosContatos

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
   

//Funcão para tratar o retorno de um filme filtrando pelo id do DAO
const buscarContato = async function(numero) {
    try {
        let id = numero

        let contatoArray = []

        // Objeto JSON
        let dadosContatos = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultContato = await contatoDAO.selectByIdContato(id)

            if(resultContato != false || typeof(resultContato) == 'object'){
                if(resultContato.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosContatos.status = true
                    dadosContatos.status_code = 200

                    for (itemContato of resultContato) {
                    
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemContato.id_usuario)
    
                        itemContato.usuario = dadosUsuario.usuario
    
                        delete itemContato.id_usuario
    
                        contatoArray.push(itemContato)
                    }
    
                    dadosContatos.usuario = contatoArray
    
                    return dadosContatos
    
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
    atualizarContato,
    excluirContato,
    listarContato,
    buscarContato,
    inserirContato
}