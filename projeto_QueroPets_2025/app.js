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
const controllerStatus =  require('./controller/Status/controllerStatus')
const controllerPorte =  require('./controller/Porte/controllerPorte')
const controllerTemperamento =  require('./controller/Temperamento/controllerTemperamento')
const controllerEspecie =  require('./controller/Especie/controllerEspecie')
const controllerSexo = require('./controller/Sexo/controllerSexo')
const controllerRaca = require('./controller/Raca/controllerRaca')
const controllerComportamento = require('./controller/Comportamento/controllerComportamento')
const controllerSaude = require('./controller/Saude/controllerSaude')
const controllerPet = require('./controller/Pet/controllerPet')
const controllerComportPet = require('./controller/Pet/controllerComportPet')
const controllerSaudePet = require('./controller/Pet/controllerSaudePet')

//Cria o objeto app com referencias do express para criar a API 
const app = express()

app.use((request, response, next)=>{
   response.header('Acces-Control-Allow-Origin', '*')
   response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

   app.use(cors(

       ))
   next() 
})

/************************************************ USUARIO *************************************************************/

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

//END-POINT para atualizar um usuario
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

 //END-POINT realizar o login de um usuario
app.post('/v1/controle-pet/login', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultusuario = await controllerUser.loginUsuario(dadosBody,contentType)

    response.status(resultusuario.status_code)
    response.json(resultusuario)
})


/************************************************ ENDERECO *************************************************************/

//END-POINT para inserir um endereco
app.post('/v1/controle-pet/endereco', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultEndereco = await controllerEndereco.inserirEndereco(dadosBody,contentType)

    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})
//END-POINT para listar os enderecos
app.get('/v1/controle-pet/endereco', cors(), bodyParserJSON, async function(request, response) {
    
    let resultEndereco = await controllerEndereco.listarEndereco()

    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})
 //END-POINT para buscar um endereco por id
app.get('/v1/controle-pet/endereco/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idEndereco = request.params.id

    let resultEndereco = await controllerEndereco.buscarEndereco(idEndereco)
    
    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})
 //END-POINT para deletar um endereco
app.delete('/v1/controle-pet/endereco/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultEndereco = await controllerEndereco.excluirEndereco(id)
  
    response.status(resultEndereco.status_code)
    response.json(resultEndereco)
})
//END-POINT para atualizar um endereco
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


/************************************************ STATUS *************************************************************/

app.post('/v1/controle-pet/status', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultstatus = await controllerStatus.inserirStatus(dadosBody,contentType)

    response.status(resultstatus.status_code)
    response.json(resultstatus)
})

//END-POINT para listar todos os status
app.get('/v1/controle-pet/status', cors(), bodyParserJSON, async function(request, response) {
    
    let resultstatus = await controllerStatus.listarStatus()

    response.status(resultstatus.status_code)
    response.json(resultstatus)
})

//END-POINT para buscar um status por id
app.get('/v1/controle-pet/status/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let Idstatus = request.params.id

    let resultstatus = await controllerStatus.buscarStatus(Idstatus)
    
    response.status(resultstatus.status_code)
    response.json(resultstatus)
})

//END-POINT  para deletar um status 
app.delete('/v1/controle-pet/status/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultstatus = await controllerStatus.excluirStatus(id)
  
    response.status(resultstatus.status_code)
    response.json(resultstatus)
})

//END-POINT para atualizar um usuario
app.put('/v1/controle-pet/status/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let Idstatus = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultstatus = await controllerStatus.atualizarStatus(Idstatus, dadosBody, contentType)

    response.status(resultstatus.status_code)
    response.json(resultstatus)
}) 

/************************************************ PORTE *************************************************************/

//END-POINT para inserir um porte
app.post('/v1/controle-pet/porte', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultPorte = await controllerPorte.inserirPorte(dadosBody,contentType)

    response.status(resultPorte.status_code)
    response.json(resultPorte)
})

//END-POINT para listar todos os porte
app.get('/v1/controle-pet/porte', cors(), bodyParserJSON, async function(request, response) {
    
    let resultPorte = await controllerPorte.listarPorte()

    response.status(resultPorte.status_code)
    response.json(resultPorte)
})

//END-POINT para buscar um porte por id
app.get('/v1/controle-pet/porte/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdPorte = request.params.id

    let resultPorte = await controllerPorte.buscarPorte(IdPorte)
    
    response.status(resultPorte.status_code)
    response.json(resultPorte)
})

//END-POINT  para deletar um porte 
app.delete('/v1/controle-pet/porte/:id', cors(), async function (request, response) {
    let IdPorte = request.params.id 
  
    let resultPorte = await controllerPorte.excluirPorte(IdPorte)
  
    response.status(resultPorte.status_code)
    response.json(resultPorte)
})

//END-POINT para atualizar um porte
app.put('/v1/controle-pet/porte/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdPorte = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultPorte = await controllerPorte.atualizarPorte(IdPorte, dadosBody, contentType)

    response.status(resultPorte.status_code)
    response.json(resultPorte)
}) 


/************************************************ TEMPERAMENTO *************************************************************/

//END-POINT para inserir um temperamento
app.post('/v1/controle-pet/temperamento', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultTemperamento = await controllerTemperamento.inserirTemperamento(dadosBody,contentType)

    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

//END-POINT para listar todos os temperamento
app.get('/v1/controle-pet/temperamento', cors(), bodyParserJSON, async function(request, response) {
    
    let resultTemperamento = await controllerTemperamento.listarTemperamento()

    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

//END-POINT para buscar um temperamento por id
app.get('/v1/controle-pet/temperamento/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdTemperamento = request.params.id

    let resultTemperamento = await controllerTemperamento.buscarTemperamento(IdTemperamento)
    
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

//END-POINT  para deletar um temperamento 
app.delete('/v1/controle-pet/temperamento/:id', cors(), async function (request, response) {
    let IdTemperamento = request.params.id 
  
    let resultTemperamento = await controllerTemperamento.excluirTemperamento(IdTemperamento)
  
    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
})

//END-POINT para atualizar um temperamento
app.put('/v1/controle-pet/temperamento/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdTemperamento = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultTemperamento = await controllerTemperamento.atualizarTemperamento(IdTemperamento, dadosBody, contentType)

    response.status(resultTemperamento.status_code)
    response.json(resultTemperamento)
}) 

/************************************************ ESPECIE *************************************************************/

//END-POINT para inserir um especie
app.post('/v1/controle-pet/especie', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultEspecie = await controllerEspecie.inserirEspecie(dadosBody,contentType)

    response.status(resultEspecie.status_code)
    response.json(resultEspecie)
})

//END-POINT para listar todos os especie
app.get('/v1/controle-pet/especie', cors(), bodyParserJSON, async function(request, response) {
    
    let resultEspecie = await controllerEspecie.listarEspecie()

    response.status(resultEspecie.status_code)
    response.json(resultEspecie)
})

//END-POINT para buscar um especie por id
app.get('/v1/controle-pet/especie/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdEspecie = request.params.id

    let resultEspecie = await controllerEspecie.buscarEspecie(IdEspecie)
    
    response.status(resultEspecie.status_code)
    response.json(resultEspecie)
})

//END-POINT  para deletar um especie 
app.delete('/v1/controle-pet/especie/:id', cors(), async function (request, response) {
    let IdEspecie = request.params.id 
  
    let resultEspecie = await controllerEspecie.excluirEspecie(IdEspecie)
  
    response.status(resultEspecie.status_code)
    response.json(resultEspecie)
})

//END-POINT para atualizar um especie
app.put('/v1/controle-pet/especie/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdEspecie = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultEspecie = await controllerEspecie.atualizarEspecie(IdEspecie, dadosBody, contentType)

    response.status(resultEspecie.status_code)
    response.json(resultEspecie)
}) 

/************************************************ SEXO *************************************************************/

//END-POINT para inserir um sexo
app.post('/v1/controle-pet/sexo', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultSexo= await controllerSexo.inserirSexo(dadosBody,contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

//END-POINT para listar todos os especie
app.get('/v1/controle-pet/sexo', cors(), bodyParserJSON, async function(request, response) {
    
    let resultSexo = await controllerSexo.listarSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

//END-POINT para buscar um especie por id
app.get('/v1/controle-pet/sexo/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdSexo = request.params.id

    let resultSexo = await controllerSexo.buscarSexo(IdSexo)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

//END-POINT  para deletar um especie 
app.delete('/v1/controle-pet/sexo/:id', cors(), async function (request, response) {
    let IdSexo = request.params.id 
  
    let resultSexo = await controllerSexo.excluirSexo(IdSexo)
  
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

//END-POINT para atualizar um especie
app.put('/v1/controle-pet/sexo/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdSexo = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultSexo = await controllerSexo.atualizarSexo(IdSexo, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}) 

/************************************************ RAÇA *************************************************************/

//END-POINT para inserir um raça
app.post('/v1/controle-pet/raca', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultRaca= await controllerRaca.inserirRaca(dadosBody,contentType)

    response.status(resultRaca.status_code)
    response.json(resultRaca)
})

//END-POINT para listar todos os raças
app.get('/v1/controle-pet/raca', cors(), bodyParserJSON, async function(request, response) {
    
    let resultRaca = await controllerRaca.listarRaca()

    response.status(resultRaca.status_code)
    response.json(resultRaca)
})

//END-POINT para buscar um especie por id
app.get('/v1/controle-pet/raca/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdRaca = request.params.id

    let resultRaca = await controllerRaca.buscarRaca(IdRaca)
    
    response.status(resultRaca.status_code)
    response.json(resultRaca)
})

//END-POINT  para deletar um especie 
app.delete('/v1/controle-pet/raca/:id', cors(), async function (request, response) {
    let IdRaca = request.params.id 
  
    let resultRaca = await controllerRaca.excluirRaca(IdRaca)
  
    response.status(resultRaca.status_code)
    response.json(resultRaca)
})

//END-POINT para atualizar um especie
app.put('/v1/controle-pet/raca/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdRaca = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultRaca = await controllerRaca.atualizarRaca(IdRaca, dadosBody, contentType)

    response.status(resultRaca.status_code)
    response.json(resultRaca)
}) 

/************************************************ COMPORTAMENTO *************************************************************/

//END-POINT para inserir um comportamento
app.post('/v1/controle-pet/comportamento', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultComportamento= await controllerComportamento.inserirComportamento(dadosBody,contentType)

    response.status(resultComportamento.status_code)
    response.json(resultComportamento)
})

//END-POINT para listar todos os comportamento
app.get('/v1/controle-pet/comportamento', cors(), bodyParserJSON, async function(request, response) {
    
    let resultComportamento = await controllerComportamento.listarComportamento()

    response.status(resultComportamento.status_code)
    response.json(resultComportamento)
})

//END-POINT para buscar um comportamento por id
app.get('/v1/controle-pet/comportamento/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idComportamento = request.params.id

    let resultComportamento = await controllerComportamento.buscarComportamento(idComportamento)
    
    response.status(resultComportamento.status_code)
    response.json(resultComportamento)
})

//END-POINT  para deletar um comportamento 
app.delete('/v1/controle-pet/comportamento/:id', cors(), async function (request, response) {
    let idComportamento = request.params.id 
  
    let resultComportamento = await controllerComportamento.excluirComportamento(idComportamento)
  
    response.status(resultComportamento.status_code)
    response.json(resultComportamento)
})

//END-POINT para atualizar um comportamento
app.put('/v1/controle-pet/comportamento/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let idComportamento = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultComportamento = await controllerComportamento.atualizarComportamento(idComportamento, dadosBody, contentType)

    response.status(resultComportamento.status_code)
    response.json(resultComportamento)
}) 

/************************************************ SAÚDE *************************************************************/

//END-POINT para inserir uma saude
app.post('/v1/controle-pet/saude', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultSaude= await controllerSaude.inserirSaude(dadosBody,contentType)

    response.status(resultSaude.status_code)
    response.json(resultSaude)
})

//END-POINT para listar todos os saude
app.get('/v1/controle-pet/saude', cors(), bodyParserJSON, async function(request, response) {
    
    let resultSaude = await controllerSaude.listarSaude()

    response.status(resultSaude.status_code)
    response.json(resultSaude)
})

//END-POINT para buscar um saude por id
app.get('/v1/controle-pet/saude/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let id = request.params.id

    let resultSaude = await controllerSaude.buscarSaude(id)
    
    response.status(resultSaude.status_code)
    response.json(resultSaude)
})

//END-POINT  para deletar um saude 
app.delete('/v1/controle-pet/saude/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultSaude = await controllerSaude.excluirSaude(id)
  
    response.status(resultSaude.status_code)
    response.json(resultSaude)
})

//END-POINT para atualizar um saude
app.put('/v1/controle-pet/saude/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultSaude = await controllerSaude.atualizarSaude(id, dadosBody, contentType)

    response.status(resultSaude.status_code)
    response.json(resultSaude)
}) 

/************************************************ PET *************************************************************/

//END-POINT para inserir um pet
app.post('/v1/controle-pet/pet', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultPet= await controllerPet.inserirPet(dadosBody,contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para listar todos os pet
app.get('/v1/controle-pet/pet', cors(), bodyParserJSON, async function(request, response) {
    
    let resultPet = await controllerPet.listarPet()

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para buscar um pet por id
app.get('/v1/controle-pet/pet/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let id = request.params.id

    let resultPet = await controllerPet.buscarPet(id)
    
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT  para deletar um pet 
app.delete('/v1/controle-pet/pet/:id', cors(), async function (request, response) {

    let id = request.params.id 
  
    let resultPet = await controllerPet.excluirPet(id)
  
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para atualizar um pet
app.put('/v1/controle-pet/pet/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultPet = await controllerPet.atualizarPet(id, dadosBody, contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
}) 

/************************************************ PET_COMPORTAMENTO *************************************************************/

//END-POINT para inserir um pet
app.post('/v1/controle-pet/pet-comportamento', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultPet= await controllerComportPet.inserirPetComportamento(dadosBody,contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para listar todos os pet
app.get('/v1/controle-pet/pet-comportamento', cors(), bodyParserJSON, async function(request, response) {
    
    let resultPet = await controllerComportPet.listarPetComportamento()

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para buscar um pet por id
app.get('/v1/controle-pet/pet-comportamento/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let id = request.params.id

    let resultPet = await controllerComportPet.buscarComportamentoPet(id)
    
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT  para deletar um pet 
app.delete('/v1/controle-pet/pet-comportamento/:id', cors(), async function (request, response) {

    let id = request.params.id 
  
    let resultPet = await controllerComportPet.excluirpetComportamento(id)
    console.log(resultPet)
  
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para atualizar um pet
app.put('/v1/controle-pet/pet-comportamento/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultPet = await controllerComportPet.atualizarpetComportamento(id, dadosBody, contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
}) 

/************************************************ PET_COMPORTAMENTO *************************************************************/

//END-POINT para inserir um pet
app.post('/v1/controle-pet/pet-saude', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultPet= await controllerSaudePet.inserirPetSaude(dadosBody,contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para listar todos os pet
app.get('/v1/controle-pet/pet-saude', cors(), bodyParserJSON, async function(request, response) {
    
    let resultPet = await controllerSaudePet.listarPetSaude()

    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para buscar um pet por id
app.get('/v1/controle-pet/pet-saude/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let id = request.params.id

    let resultPet = await controllerSaudePet.buscarSaudePet(id)
    
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT  para deletar um pet 
app.delete('/v1/controle-pet/pet-saude/:id', cors(), async function (request, response) {

    let id = request.params.id 
  
    let resultPet = await controllerSaudePet.excluirPetSaude(id)
    console.log(resultPet)
  
    response.status(resultPet.status_code)
    response.json(resultPet)
})

//END-POINT para atualizar um pet
app.put('/v1/controle-pet/pet-saude/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultPet = await controllerSaudePet.atualizarPetSaude(id, dadosBody, contentType)

    response.status(resultPet.status_code)
    response.json(resultPet)
}) 

app.listen('3030', function(){
    console.log('API funcionando e aguardando requisições...')
})