// routes/historicoRoutes.js
const express = require('express');
const HistoricoTratamentoController = require('../controllers/HistoricoTratamentoController');

const router = express.Router();

router.post('/:id/historico', HistoricoTratamentoController.adicionarHistorico);
router.get('/:id/historico', HistoricoTratamentoController.visualizarHistorico);

module.exports = router;
