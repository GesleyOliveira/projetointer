const swaggerAutogen = require('swagger-autogen')({openapi: '3.1.0'});

const doc = {
    info: {
        version: "1.0.0",
        title: "Documentação da API Ponto dos Professores",
        description: "Nesta API você será capaz de consultar os end-points e testar todas as rotas disponíveis"
    },
    servers: [
        {
            url: 'http://localhost:4000'
        }
    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js', './src/controller/professorController.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./');
});