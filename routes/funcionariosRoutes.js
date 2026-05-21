const express = require('express');
const router = express.Router();
const funcionarios = require('../model/funcionariosModel');

// GET - Buscar todos os funcionarios
router.get('/', async (req, res) => {
    try {
        const todosOsfuncionarios = await funcionarios.findAll();
        res.status(200).json(todosOsfuncionarios);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar funcionarios.',
            detalhe: erro.message
        });
    }
});

// POST - Cadastrar um novo funcionário
router.post('/', async (req, res) => {
    try {
        // CORREÇÃO: Pegar os campos certos que estão no seu Model
        const { nome, email, telefone, cargo, setor } = req.body;
        
        // CORREÇÃO: Passar as variáveis corretas para o banco
        const novoFuncionario = await funcionarios.create({ nome, email, telefone, cargo, setor });

        res.status(201).json({
            mensagem: 'Funcionário cadastrado com sucesso!',
            funcionario: novoFuncionario // Padronizado (estava Aluno)
        });
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar o funcionário. Verifique se o e-mail ou cargo já existem.',
            detalhe: erro.message
        });
    }
});


// PUT - Atualizar os dados de um funcionário existente
router.put('/funcionarioses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // CORREÇÃO: Pegar os campos certos aqui também
        const { nome, email, telefone, cargo, setor } = req.body;

        const funcionarioExistente = await funcionarios.findByPk(id);

        if (!funcionarioExistente) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }

        // CORREÇÃO: Atualizar com os campos de funcionários
        await funcionarioExistente.update({ nome, email, telefone, cargo, setor });

        res.json({
            message: 'Funcionário atualizado com sucesso!',
            funcionario: funcionarioExistente
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar funcionário',
            detalhe: error.message
        });
    }
});

// DELETE - Remover um aluno do banco de dados
router.delete('/funcionarioses/:id', async (req, res) => {
    try {
        const { id } = req.params;


        const aluno = await funcionarios.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ message: 'funcionarios não encontrado' });
        }

        // Remove o registro do banco
        await aluno.destroy();

        res.json({ message: 'funcionarios removido com sucesso!' });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao remover aluno',
            detalhe: error.message
        });
    }
});

module.exports = router;