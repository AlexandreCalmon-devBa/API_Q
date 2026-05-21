const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const funcionarios = sequelize.define('funcionarios', {
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
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    setor: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'funcionarios',
    timestamps: true // Cria automaticamente campos de 'createdAt' e 'updatedAt'
});

module.exports = funcionarios;