import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import './style.css'

export default function ListaClientesPage() {
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await api.get('/clientes')
                setClientes(response.data)
            } catch (erro) {
                toast.error('Erro ao buscar clientes')
                console.error(erro)
            }
        }

        fetchClientes()
    }, [])

    return (
        <div className="lista-clientes">
            <h1>Lista de Clientes</h1>
            <table className='tabela-clientes'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.email}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}