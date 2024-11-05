// controllers/ClienteController.js
const Cliente = require('../models/Cliente');
const HistoricoTratamento = require('../models/HistoricoTratamento');

module.exports = {
  async criarCliente(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async visualizarCliente(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id, { include: HistoricoTratamento });
      if (cliente) res.json(cliente);
      else res.status(404).json({ error: 'Cliente não encontrado' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarCliente(req, res) {
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
  },

  async excluirCliente(req, res) {
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
  }
};
