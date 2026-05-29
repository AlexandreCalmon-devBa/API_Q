import './styles.css'

export default function Footer(){
    return (
        <footer className='footer'>
            <p>
                &copy; {new Date().getUTCFullYear} -
                Todos os direitos reservados.
                <br />
                SENAI - BAHIA
            </p>
        </footer>
    )
}

