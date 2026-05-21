const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_api_2', 'root', '', {
    host: '127.0.0.1', // Mantém a conexão local estável e sem timeout
    dialect: 'mysql',
    port: 3306,
    logging: false // Deixa o terminal limpo, sem exibir os comandos SQL puros
});

module.exports = sequelize;