const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Cliente = require('./Cliente');

const HistoricoTratamento = sequelize.define('HistoricoTratamento', {
  cliente_id: { 
    type: DataTypes.INTEGER,
    references: { model: Cliente, key: 'id' }
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataTratamento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dentista: {
    type: DataTypes.STRING,
  },
  observacao: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false,
});

HistoricoTratamento.belongsTo(Cliente, { foreignKey: 'cliente_id' });
module.exports = HistoricoTratamento;
