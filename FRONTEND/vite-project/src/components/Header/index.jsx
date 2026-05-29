import { Link } from 'react-router-dom'
import './styles.css'

export default function Header(){
    return (
        <header className='header'>
            <h1>Sistema</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/cadastro'>Cadastro</Link>
                <Link to='/lista'>Listar</Link>
            </nav>
        </header>
    )
}

