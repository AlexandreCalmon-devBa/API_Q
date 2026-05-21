import { useState, useEffect, useCallback } from 'react';

// cspell:disable-line - Desativa o aviso de português no cSpell para a palavra Produtos
function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [lote, setLote] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [vencimento, setVencimento] = useState('');

  const API_URL = 'http://localhost:3000/produtos';

  // 1. Mantemos o useCallback para os gatilhos manuais (Cadastrar e Deletar)
  const buscarProdutos = useCallback(async () => {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      if (Array.isArray(dados)) {
        setProdutos(dados);
      }
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    }
  }, []); 

  // 2. CORREÇÃO DO LINTER: No carregamento inicial, isolamos o fetch de forma assíncrona pura
  // Isso impede que o linter acuse "Calling setState synchronously within an effect"
  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        if (Array.isArray(dados) && ativo) {
          setProdutos(dados);
        }
      } catch (erro) {
        console.error("Erro no carregamento inicial:", erro);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []); // Array vazio limpo. Roda apenas uma vez ao montar.

  // POST - Cadastrar
  const handleCadastrar = async (e) => {
    e.preventDefault();
    
    const novoProduto = { 
      nome, 
      lote: Number(lote), 
      preco: Number(preco.replace(',', '.')), 
      quantidade, 
      vencimento: vencimento ? Number(vencimento) : null 
    };

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto)
      });

      if (resposta.ok) {
        alert('Produto cadastrado com sucesso!');
        setNome(''); setLote(''); setPreco(''); setQuantidade(''); setVencimento('');
        buscarProdutos(); // Chama o callback manual com segurança
      } else {
        const erroDados = await resposta.json().catch(() => ({})); 
        alert(`Erro: ${erroDados.mensagem || 'Falha ao cadastrar'}`);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  };

  // DELETE - Remover
  const handleDeletar = async (id) => {
    if (!id) {
      alert("ID do produto não encontrado.");
      return;
    }

    if (window.confirm("Deseja mesmo remover este produto?")) {
      try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (resposta.ok) {
          alert('Produto removido!');
          buscarProdutos(); // Chama o callback manual com segurança
        } else {
          alert('Erro ao tentar deletar o produto.');
        }
      } catch (erro) {
        console.error("Erro ao deletar:", erro);
      }
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#333' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>📦 Controle de Estoque (Produtos)</h2>

      {/* Form */}
      <form onSubmit={handleCadastrar} style={{ display: 'grid', gap: '12px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Novo Produto</h3>
        <input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} type="text" placeholder="Nome do Produto" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} type="number" placeholder="Lote (Apenas números)" value={lote} onChange={(e) => setLote(e.target.value)} required />
        <input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} type="text" placeholder="Quantidade (Ex: 50 un)" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} type="text" placeholder="Preço (Ex: 19.90)" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} type="number" placeholder="Vencimento (AAAAMMDD)" value={vencimento} onChange={(e) => setVencimento(e.target.value)} />
        <button type="submit" style={{ padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar no Banco</button>
      </form>

      {/* Tabela de Dados */}
      <h3>Itens no Banco de Dados</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Lote</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Qtd</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Preço</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id || p._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{p.nome}</td>
              <td style={{ padding: '10px' }}>{p.lote}</td>
              <td style={{ padding: '10px' }}>{p.quantidade || '-'}</td>
              <td style={{ padding: '10px' }}>R$ {p.preco}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button onClick={() => handleDeletar(p.id || p._id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Deletar</button>
              </td>
            </tr>
          ))}
          {produtos.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>Nenhum produto cadastrado ou backend desconectado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;