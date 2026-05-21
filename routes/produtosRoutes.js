const express = require('express');
const router = express.Router();
const produtos = require('../model/produtosModel');

// GET - Buscar todos os produtos
// URL: GET http://localhost:3000/produtos
router.get('/', async (req, res) => {
    try {
        const todosOsprodutos = await produtos.findAll();
        res.status(200).json(todosOsprodutos);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar produtos.',
            detalhe: erro.message
        });
    }
});

// POST - Cadastrar um novo produto
// URL: POST http://localhost:3000/produtos
router.post('/', async (req, res) => {
    try {
        // CORREÇÃO: Pegar os campos certos do corpo da requisição
        const { nome, lote, quantidade, preco, vencimento } = req.body;
        
        // CORREÇÃO: Passar os campos certos para o Sequelize criar no banco
        const novoprodutos = await produtos.create({ nome, lote, quantidade, preco, vencimento });

        res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso!',
            produtos: novoprodutos
        });
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar o produto. Verifique se o lote já existe.',
            detalhe: erro.message
        });
    }
});

// PUT - Atualizar os dados de um produto existente
// URL: PUT http://localhost:3000/produtos/1
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // CORREÇÃO: Pegar os campos certos aqui também
        const { nome, lote, quantidade, preco, vencimento } = req.body;

        const produtoExistente = await produtos.findByPk(id);

        if (!produtoExistente) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // CORREÇÃO: Atualizar com os campos de produtos
        await produtoExistente.update({ nome, lote, quantidade, preco, vencimento });

        res.json({
            message: 'Produto atualizado com sucesso!',
            produtos: produtoExistente
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar produto',
            detalhe: error.message
        });
    }
});

// DELETE - Remover um produto do banco de dados
// URL: DELETE http://localhost:3000/produtos/1
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // CORREÇÃO: Mudamos o nome da constante para 'produto' (no singular)
        const produto = await produtos.findByPk(id);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Remove o registro do banco usando a constante correta
        await produto.destroy();

        res.json({ message: 'Produto removido com sucesso!' });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao remover produto',
            detalhe: error.message
        });
    }
});

module.exports = router;