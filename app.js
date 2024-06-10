const express = require('express')
const config = require('dotenv')
const mongoose = require('mongoose');
const app = express()
const port = 4000
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  
let db = mongoose.connection;

let url = 'mongodb+srv://janmello123:joao123@projetointerdisciplinar.yuod8po.mongodb.net/projetoInterdisciplinar';


const { validaProfessor, validarCadastroProfessor } = require('./src/controller/validacoes');
app.use(express.json());
app.post('/professores', validaProfessor, async (req, res) => {
  // Se chegou até aqui, os dados estão validados
  const { name, cpf } = req.body;

  // Salvar os dados no banco de dados
  await db.collection('professores').insertOne({ name, cpf });

  res.status(201).send('Professor cadastrado com sucesso');
});



config.config()

const professorRoute = require('./src/routes/professorRoutes')
const usuarioRoute = require('./src/routes/usuarioRoutes')
const cursoRoute = require('./src/routes/cursoRoutes')
const horarioRoute = require('./src/routes/horarioRoutes')

app.set('view engine', 'ejs') 
app.set('views', './src/views')



app.get('/', (req, res) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Direciona o Usuário a página de Login'
    */
  res.render('login', {mensagemLogin:""})
    /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Renderiza a página de Login'
    */
})

app.get('/index', (req, res) => {
    /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Direciona a página inicial'
    */
  res.render('index');
});

app.get('/listar', (req, res) => {
    /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Lista os professores, com as matérias e os horários'
    */
  res.render('listar');
});

// Configurar acesso à BD.
//const mongoose = require('mongoose');
//mongodb://127.0.0.1:27017/projetoInterdisciplinar
//let url = 'mongodb+srv://janmello123:joao123@projetointerdisciplinar.yuod8po.mongodb.net/projetoInterdisciplinar'
//let mongoDB = url;
mongoose.connect(url);
mongoose.Promise = global.Promise;
//let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar ao MongoDB'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(professorRoute)
app.use(usuarioRoute)
app.use(cursoRoute)
app.use(horarioRoute)


app.listen(port, () => {
    console.log(`Projeto rodando na porta:${port}`)
  })