const express = require('express');
const sequelize = require('./database');
const Cliente = require('./models/Cliente');
const HistoricoTratamento = require('./models/HistoricoTratamento');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, { include: HistoricoTratamento });
    if (cliente) res.json(cliente);
    else res.status(404).json({ error: 'Cliente não encontrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Servidor rodando na porta ${PORT}`);
});
