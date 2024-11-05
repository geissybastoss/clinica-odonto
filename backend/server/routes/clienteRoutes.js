// routes/clienteRoutes.js
const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

router.post('/', ClienteController.criarCliente);
router.get('/:id', ClienteController.visualizarCliente);
router.put('/:id', ClienteController.atualizarCliente);
router.delete('/:id', ClienteController.excluirCliente);

module.exports = router;
