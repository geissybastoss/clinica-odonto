const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Rota para consultar o status financeiro de um cliente
router.get('/:id/status-financeiro', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json({ statusFinanceiro: cliente.status_financeiro });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar status financeiro.' });
  }
});

// Rota para atualizar o status financeiro de um cliente
router.put('/:id/status-financeiro', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });

    cliente.status_financeiro = req.body.status_financeiro; // 'regular' ou 'inadimplente'
    await cliente.save();

    res.json({ message: 'Status financeiro atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status financeiro.' });
  }
});

module.exports = router;
