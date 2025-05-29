/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const userDAO = require('../../model/DAO/usuario')
const contatoDAO = require ('../../model/DAO/contato') 
const controllerEndereco = require('../../controller/Endereco/controllerEndereco.js')

//Função para inserir uma nova ususuario
const inserirUsuario = async function(user, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            user.nome            == '' || user.nome            == null || user.nome            == undefined || user.nome.length             > 100 ||
            user.email           == '' || user.email           == null || user.email           == undefined || user.email.length            > 100 ||
            user.senha           == '' || user.senha           == null || user.senha           == undefined || user.senha.length            > 100 ||
            user.palavra_chave   == '' || user.palavra_chave   == null || user.palavra_chave   == undefined || user.palavra_chave.length    > 100 || 
            user.data_nascimento == '' || user.data_nascimento == null || user.data_nascimento == undefined || user.data_nascimento.length  > 10  || 
            user.cpf             == '' || user.cpf             == null || user.cpf             == undefined || user.cpf.length              > 12  ||
            user.id_endereco     == '' || user.id_endereco     == null || user.id_endereco     == undefined || isNaN(user.id_endereco)    
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da user para o DAO realizar o insert no Banco de dados
                let resultuser = await userDAO.insertUser(user)

                if(resultuser){
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

const inserirUsuarioContato = async function(body, contentType){

    const user = body.usuario
    const contato = body.contato.telefone
   

    try {


        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            user.nome            == '' || user.nome            == null || user.nome            == undefined || user.nome.length             > 100 ||
            user.email           == '' || user.email           == null || user.email           == undefined || user.email.length            > 100 ||
            user.senha           == '' || user.senha           == null || user.senha           == undefined || user.senha.length            > 100 ||
            user.palavra_chave   == '' || user.palavra_chave   == null || user.palavra_chave   == undefined || user.palavra_chave.length    > 100 || 
            user.data_nascimento == '' || user.data_nascimento == null || user.data_nascimento == undefined || user.data_nascimento.length  > 10  || 
            user.cpf             == '' || user.cpf             == null || user.cpf             == undefined || user.cpf.length              > 12  ||
            user.id_endereco     == '' || user.id_endereco     == null || user.id_endereco     == undefined || isNaN(user.id_endereco ||
                contato.telefone                       == ''   ||  contato.telefone             == undefined    || contato.telefone               == null     ||      contato.telefone.length > 100  )    
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da user para o DAO realizar o insert no Banco de dados
                let resultuser = await userDAO.insertUser(user, contato)

                if(resultuser){
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


//Função para atualizar uma user existente
const atualizarUsuario = async function(id, user, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                user.nome            == '' || user.nome            == null || user.nome            == undefined || user.nome.length             > 100 ||
                user.email           == '' || user.email           == null || user.email           == undefined || user.email.length            > 100 ||
                user.senha           == '' || user.senha           == null || user.senha           == undefined || user.senha.length            > 100 ||
                user.palavra_chave   == '' || user.palavra_chave   == null || user.palavra_chave   == undefined || user.palavra_chave.length    > 100 || 
                user.data_nascimento == '' || user.data_nascimento == null || user.data_nascimento == undefined || user.data_nascimento.length  > 10  || 
                user.cpf             == '' || user.cpf             == null || user.cpf             == undefined || user.cpf.length              > 12  ||
                user.id_endereco     == '' || user.id_endereco     == null || user.id_endereco     == undefined || isNaN(user.id_endereco)   
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await userDAO.selectByIdUser(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            user.id = id
                            let resultuser = await userDAO.updateUser(user)

                            if(resultuser){
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

//Função para excluir uma usuario  existente
const excluirUsuario = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultuser = await userDAO.selectByIdUser(id)
        if(resultuser!= false || typeof(resultuser)== "object"){
            if(resultuser.length > 0){
                //delete
                let result = await userDAO.deleteUser(id)

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

//Função para retornar uma lista usuarios
const listarUsuario = async function(){
    try {

        let UsuarioArray = []
        //Criando um Objeto JSON
        let dadosUsuario = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultUsuario = await userDAO.selectAllUsers()

        if(resultUsuario != false){
            if(resultUsuario.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadosUsuario.status = true
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length
                
                for (itemUsuario of resultUsuario) {
                    
                    let dadosUser = await controllerEndereco.buscarEndereco(itemUsuario.id_endereco)

                    itemUsuario.endereco = dadosUser.endereco

                    delete itemUsuario.id_endereco

                    UsuarioArray.push(itemUsuario)
                }

                dadosUsuario.usuario = UsuarioArray

                return dadosUsuario

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

//Função para buscar um user pelo ID
const buscarUsuario = async function(numero) {
    try {
        let id = numero

        let usuarioArray = []

        // Objeto JSON
        let dadosUsuario = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultUsuario = await userDAO.selectByIdUser(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200

                    for (itemEndereco of resultUsuario) {
                    
                        let dadosEndereco = await controllerEndereco.buscarEndereco(itemEndereco.id_endereco)
    
                        itemEndereco.endereco = dadosEndereco.endereco
    
                        delete itemEndereco.id_endereco
    
                        usuarioArray.push(itemEndereco)
                    }
    
                    dadosUsuario.usuario = usuarioArray
    
                    return dadosUsuario
    
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

const loginUsuario = async function(user) {
    try {
    
        let dadosUsuario = {}
        if(
        
            user.email           == '' || user.email           == null || user.email           == undefined || user.email.length            > 100 ||
            user.senha           == '' || user.senha           == null || user.senha           == undefined || user.senha.length            > 100 
           )
            {
               return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
            // Chama a função para retornar as músicas do banco de dados
            
            let resultUsuario = await userDAO.loginUser(user)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    dadosUsuario.usuario = resultUsuario
    
                    return dadosUsuario
    
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario,
    loginUsuario,
    inserirUsuarioContato
   
}