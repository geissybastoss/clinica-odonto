const express = require('express');
const router = express.Router();
const HistoricoTratamento = require('../models/HistoricoTratamento');
const Cliente = require('../models/Cliente');

// Rota para listar histórico de um cliente específico
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const historico = await HistoricoTratamento.findAll({
      where: { cliente_id: req.params.clienteId }
    });
    res.json(historico);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar histórico de tratamentos.' });
  }
});

// Rota para adicionar um tratamento ao histórico
router.post('/', async (req, res) => {
  try {
    const novoTratamento = await HistoricoTratamento.create(req.body);
    res.status(201).json(novoTratamento);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar tratamento ao histórico.' });
  }
});

module.exports = router;
