const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  idade: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  telefone: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { 
    type: DataTypes.STRING,
    unique: true 
  },
  plano_saude: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_financeiro: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'regular', // 'regular' ou 'inadimplente'
  }
});

module.exports = Cliente;
