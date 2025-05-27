/* Objetivo: Criar um API para realizar o CRUD do sistema de controle de um site de doação de pets
* Autor: Felipe Vieira
* OBSERVAÇÃO:
*      Para criar a API precisamos instalar:
*          * express           npm install express --save
*          * cors              npm install cors --save
*          * body-parser       npm install body-parser --save
*
*      Para criar a integração com o Banco de Dados precisamos instalar:
*          * prisme            npm install prisma --save           (para fazer conexão com o BD)
*          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
*        
* 
*            Após a instalação do prisma e do prisma client, devemos:
*              npx prisma init
*            Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
*            Após essa configuração deverá rodar o seguinte comando:
*              npx prisma migrate dev
*************************************************************************************************/




//Import das bibliotecas para configurar a API 
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Manipular o body da quisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()


//import das controllers
const controllerUser = require('./controller/Usuario/ControllerUsuario')
const controllerEndereco = require('./controller/Endereco/controllerEndereco.js')
const controllerContato =  require('./controller/Contato/controllerContato')


//Cria o objeto app com referencias do express para criar a API 
const app = express()

app.use((request, response, next)=>{
   response.header('Acces-Control-Allow-Origin', '*')
   response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

   app.use(cors())
   next()
})



/********************************* USUARIO ***********************************/

//END-POINT para inserir um usuario
app.post('/v1/controle-pet/usuario', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultusuario = await controllerUser.inserirUsuario(dadosBody,contentType)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

//END-POINT para listar todos os usuario
app.get('/v1/controle-pet/usuario', cors(), bodyParserJSON, async function(request, response) {
    
    let resultusuario = await controllerUser.listarUsuario()

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

//END-POINT para buscar um usuario por id
app.get('/v1/controle-pet/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let Idusuario = request.params.id

    let resultusuario = await controllerUser.buscarUsuario(Idusuario)
    
    response.status(resultusuario.status_code)
    response.json(resultusuario)
})

//END-POINT  para deletar um usuario 
app.delete('/v1/controle-pet/usuario/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultusuario = await controllerUser.excluirUsuario(id)
  
    response.status(resultusuario.status_code)
    response.json(resultusuario)
  })

//END-POINT para atualizar oum usuario
app.put('/v1/controle-pet/usuario/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let Idusuario = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultusuario = await controllerUser.atualizarUsuario(Idusuario, dadosBody, contentType)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
}) 



/********************************* ENDERECO ***********************************/
app.post('/v1/controle-pet/endereco', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultEndereco = await controllerEndereco.inserirEndereco(dadosBody,contentType)

    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})

app.get('/v1/controle-pet/endereco', cors(), bodyParserJSON, async function(request, response) {
    
    let resultEndereco = await controllerEndereco.listarEndereco()

    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})

app.get('/v1/controle-pet/endereco/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idEndereco = request.params.id

    let resultEndereco = await controllerEndereco.buscarEndereco(idEndereco)
    
    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})

app.delete('/v1/controle-pet/endereco/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultEndereco = await controllerEndereco.excluirEndereco(id)
  
    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
  })

app.put('/v1/controle-pet/endereco/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let idEndereco = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultEndereco = await controllerEndereco.atualizarEndereco(idEndereco, dadosBody, contentType)

    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
}) 


/************************************************ CONTATO *************************************************************/

//END-POINT para inserir um Contato
app.post('/v1/controle-pet/contato', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultContato = await controllerContato.inserirContato(dadosBody,contentType)

    response.status(resultContato.status_code)
    response.json(resultContato)
})

//END-POINT para listar todos os contato
app.get('/v1/controle-pet/contato', cors(), bodyParserJSON, async function(request, response) {
    
    let resultContato = await controllerContato.listarContato()

    response.status(resultContato.status_code)
    response.json(resultContato)
})

//END-POINT para buscar um contato por id
app.get('/v1/controle-pet/contato/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdContato = request.params.id

    let resultContato = await controllerContato.buscarContato(IdContato)
    
    response.status(resultContato.status_code)
    response.json(resultContato)
})

//END-POINT  para deletar um contato 
app.delete('/v1/controle-pet/contato/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultContato = await controllerContato.excluirContato(id)
  
    response.status(resultContato.status_code)
    response.json(resultContato)
  })

//END-POINT para atualizar oum usuario
app.put('/v1/controle-pet/contato/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdContato = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultContato = await controllerContato.atualizarContato(IdContato, dadosBody, contentType)

    response.status(resultContato.status_code)
    response.json(resultContato)
}) 


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})