const express = require('express');
const sequelize = require('./database');
const Cliente = require('./models/Cliente');
const HistoricoTratamento = require('./models/HistoricoTratamento');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Rota para criar um cliente
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Rota para visualizar um cliente pelo ID (inclui o histórico de tratamentos)
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, { include: HistoricoTratamento });
    if (cliente) res.json(cliente);
    else res.status(404).json({ error: 'Cliente não encontrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Rota para atualizar as informações de um cliente
app.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      await cliente.update(req.body);
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Rota para excluir um cliente
app.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      await cliente.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Rota para adicionar um histórico de tratamento
app.post('/clientes/:id/historico', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

    const historico = await HistoricoTratamento.create({ ...req.body, cliente_id: cliente.id });
    res.status(201).json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Rota para visualizar o histórico de tratamento de um cliente
app.get('/clientes/:id/historico', async (req, res) => {
  try {
    const historico = await HistoricoTratamento.findAll({
      where: { cliente_id: req.params.id },
    });
    res.json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar o servidor e sincronizar o banco de dados
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Servidor rodando na porta ${PORT}`);
});
