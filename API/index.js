const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const rotasClientes = require('./routes/ClientesRoutes');
const rotasprodutos = require('./routes/produtosRoutes');
const rotasfuncionarios = require('./routes/funcionariosRoutes');

const app = express();
const port = 3000;


app.use(cors());

// Middlewares essenciais
app.use(express.json()); // Habilita o Express a entender requisições JSON

// Definição dos caminhos das rotas (Prefixos)
app.use('/produtos', rotasprodutos);
app.use('/Clientes', rotasClientes);
app.use('/funcionarios', rotasfuncionarios);


// Sincronização com o Banco de Dados e Inicialização do Servidor
sequelize.sync({ alter: true }) // Atualiza a estrutura das tabelas se você mudar o model
    .then(() => {
        console.log('=========================================');
        console.log('  Banco de Dados sincronizado com sucesso! ');
        console.log('=========================================');

        app.listen(port, () => {
            console.log(`Servidor online em: http://localhost:${port}`);
        });
    })
    .catch((erro) => {
        console.error('=========================================');
        console.error(' FAILED: Erro ao conectar ou sincronizar! ');
        console.error('=========================================');
        console.error(erro); // Imprime a stack do erro real (ex: ETIMEDOUT, Access Denied)
    });