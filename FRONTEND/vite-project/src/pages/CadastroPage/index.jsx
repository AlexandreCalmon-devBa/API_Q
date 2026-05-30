import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import './style.css'

export default function CadastroPage() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    // Novo estado para o CPF adicionado
    const [cpf, setCpf] = useState('') 
    const [estaEnviando, setEstaEnviando] = useState(false)

    function limparCamposDoFormulario() {
        setNome('')
        setEmail('')
        setTelefone('')
        setCpf('') // Limpando o CPF também
    }

    async function envioDoFormulario(e) {
        e.preventDefault()
        setEstaEnviando(true)

        // Agora enviamos o CPF junto no payload para o backend!
        const dadosDoFormulario = { nome, email, telefone, cpf }
        
        try {
            const resposta = await api.post('/clientes', dadosDoFormulario)
            
            toast.success(resposta.data?.mensagem || 'Cliente cadastrado com sucesso!')
            limparCamposDoFormulario()
        } catch (erro) {
            const mensagemDoServidor = erro?.response?.data?.mensagem || 'Erro ao cadastrar. Verifique os dados.'
            toast.error(mensagemDoServidor)
            console.error('Detalhes do erro:', erro.response?.data)
        } finally {
            setEstaEnviando(false)
        }
    }

    return (
        <div className='cadastro-page'>
            <form onSubmit={envioDoFormulario}>
                
                <div className='form-grupo'>
                    <label htmlFor='campo-nome'>Nome</label>
                    <input
                        id='campo-nome'
                        type='text'
                        placeholder='Ex: Nilton'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className='form-grupo'>
                    <label htmlFor='campo-email'>E-mail</label>
                    <input
                        id='campo-email'
                        type='email'
                        placeholder='Ex: nilton@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Novo input de CPF adicionado aqui */}
                <div className='form-grupo'>
                    <label htmlFor='campo-cpf'>CPF</label>
                    <input
                        id='campo-cpf'
                        type='text'
                        placeholder='Ex: 000.000.000-00'
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>

                <div className='form-grupo'>
                    <label htmlFor='campo-telefone'>Telefone</label>
                    <input
                        id='campo-telefone'
                        type='text'
                        placeholder='Ex: (71) 90000-0000'
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={estaEnviando}>
                    {estaEnviando ? 'Cadastrando...' : 'Cadastrar Cliente'}
                </button>

            </form>
        </div>
    )
}