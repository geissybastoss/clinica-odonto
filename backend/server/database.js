const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cria a instância do Sequelize usando as variáveis de ambiente
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

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com MySQL estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com MySQL:', err));

// Sincroniza os modelos com o banco de dados - desabilite alter para produção
sequelize.sync()
  .then(() => console.log('Sincronização com o banco de dados concluída.'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

module.exports = sequelize;
