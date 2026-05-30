import { Link } from 'react-router-dom'
import './styles.css'

export default function Header(){
    return (
        <header className='header'>
            <div className='logo'>
                {/* Você pode trocar por uma imagem/svg do seu logo depois */}
                <h1>Sistema</h1>
            </div>
            
            <nav className='main-nav'>
                <Link to='/'>Home</Link>
                <Link to='/cadastro'>Cadastro</Link>
                <Link to='/lista'>Listar</Link>
            </nav>

            {/* Nova seção para espelhar o lado direito da imagem */}
            <div className='header-actions'>
                <button className='icon-btn'>🔍</button>
                <button className='icon-btn'>🔔</button>
                <div className='user-profile'>
                    
                </div>
            </div>
        </header>
    )
}