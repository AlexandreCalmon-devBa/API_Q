const express = require('express');
const router = express.Router();
const Clientes = require('../model/clientesModel');

// GET - Buscar todos os Clientes
// URL: GET http://localhost:3000/Clientes
router.get('/', async (req, res) => {
    try {
        const todosOsClientes = await Clientes.findAll();
        res.status(200).json(todosOsClientes);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar Clientes.',
            detalhe: erro.message
        });
    }
});

// POST - Cadastrar un novo Aluno
// URL: POST http://localhost:3000/Clientes
router.post('/', async (req, res) => {
    try {
        const { nome, email, telefone, cpf, idade } = req.body;
        const novoAluno = await Clientes.create({ nome, email, telefone, cpf, idade });

        res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso!',
            Aluno: novoAluno
        });
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar o Cliente. Verifique se o e-mail ou CPF já existem.',
            detalhe: erro.message
        });
    }
});

// PUT - Atualizar os dados de um aluno existente
// URL: PUT http://localhost:3000/Clientes/1
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, cpf, idade } = req.body;

        // 1. Busca o aluno pelo ID
        const aluno = await Clientes.findByPk(id);

        // 2. Se não encontrar, retorna 404
        if (!aluno) {
            return res.status(404).json({ message: 'Clientes não encontrado' });
        }

        // 3. Atualiza os dados no objeto e salva no banco
        await aluno.update({ nome, email, telefone, cpf});

        res.json({
            message: 'Clientes atualizado com sucesso!',
            aluno
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar Clientes',
            detalhe: error.message
        });
    }
});

// DELETE - Remover um aluno do banco de dados
// URL: DELETE http://localhost:3000/Clientes/1
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const aluno = await Clientes.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ message: 'Clientes não encontrado' });
        }

        // Remove o registro do banco
        await aluno.destroy();

        res.json({ message: 'Clientes removido com sucesso!' });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao remover Clientes',
            detalhe: error.message
        });
    }
});

module.exports = router;