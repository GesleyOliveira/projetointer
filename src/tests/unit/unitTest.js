// app.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('Testes de integração do ponto', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    await mongoose.connect('mongodb://localhost:27017/teste_banco_de_dados', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Desconectar do banco de dados de teste após os testes
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpar os dados de teste antes de cada teste
    await mongoose.connection.collection('pontos').deleteMany({});
  });

  it('Deve retornar os registros de ponto', async () => {
    // Inserir alguns registros de ponto de teste no banco de dados
    await mongoose.connection.collection('pontos').insertMany([
      { diaMes: 1, nome: 'João', curso: 'Ciência da Computação', materia: 'Matemática', entrada: '08:00', saida: '17:00' },
      { diaMes: 2, nome: 'Maria', curso: 'Engenharia Elétrica', materia: 'Física', entrada: '07:30', saida: '16:30' },
    ]);

    // Fazer uma requisição GET para a rota /registroPonto
    const response = await request(app).get('/registroPonto');

    // Verificar se o status da resposta é 200 (OK)
    expect(response.status).toBe(200);

    // Verificar se os registros de ponto retornados são os esperados
    expect(response.body.length).toBe(2);
    expect(response.body[0].diaMes).toBe(1);
    expect(response.body[0].nome).toBe('João');
    expect(response.body[1].diaMes).toBe(2);
    expect(response.body[1].nome).toBe('Maria');
  });
});
