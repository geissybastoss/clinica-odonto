// controllers/HistoricoTratamentoController.js
const HistoricoTratamento = require('../models/HistoricoTratamento');
const Cliente = require('../models/Cliente');

module.exports = {
  async adicionarHistorico(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

      const historico = await HistoricoTratamento.create({ ...req.body, cliente_id: cliente.id });
      res.status(201).json(historico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async visualizarHistorico(req, res) {
    try {
      const historico = await HistoricoTratamento.findAll({
        where: { cliente_id: req.params.id },
      });
      res.json(historico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
