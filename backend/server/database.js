const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexão com MySQL estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com MySQL:', err));

module.exports = sequelize;
