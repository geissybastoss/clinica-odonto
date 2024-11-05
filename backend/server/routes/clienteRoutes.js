const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

// Rota para adicionar um novo cliente
router.post('/', async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
});

// Rota para buscar um cliente específico
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
});

// Rota para atualizar informações de um cliente
router.put('/:id', async (req, res) => {
  try {
    const [atualizado] = await Cliente.update(req.body, { where: { id: req.params.id } });
    if (!atualizado) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json({ message: 'Cliente atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
  try {
    const deletado = await Cliente.destroy({ where: { id: req.params.id } });
    if (!deletado) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json({ message: 'Cliente deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
});

module.exports = router;
