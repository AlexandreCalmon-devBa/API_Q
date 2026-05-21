const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const produtos = sequelize.define('produtos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    quantidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    vencimento: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'produtos',
    timestamps: true // Cria automaticamente campos de 'createdAt' e 'updatedAt'
});

module.exports = produtos;