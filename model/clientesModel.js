const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clientes = sequelize.define('Clientes', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'Clientes',
    timestamps: true // Cria automaticamente campos de 'createdAt' e 'updatedAt'
});

module.exports = Clientes;