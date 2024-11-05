// index.js
const express = require('express');
const sequelize = require('./database');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');
const historicoRoutes = require('./routes/historicoRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/clientes', historicoRoutes);

// Iniciar o servidor e sincronizar o banco de dados
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Servidor rodando na porta ${PORT}`);
});
