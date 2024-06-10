// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/meu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definindo o modelo do ponto
const PontoSchema = new mongoose.Schema({
  diaMes: Number,
  nome: String,
  curso: String,
  materia: String,
  entrada: String,
  saida: String,
});

const Ponto = mongoose.model('Ponto', PontoSchema);

// Middleware para parsing do corpo das requisições
app.use(bodyParser.json());

// Rota para obter registros de ponto
app.get('/registroPonto', async (req, res) => {
  try {
    const registros = await Ponto.find();
    res.json(registros);
  } catch (error) {
    console.error('Erro ao obter registros de ponto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = app;
