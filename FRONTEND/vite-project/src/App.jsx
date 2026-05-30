import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Importante: CSS padrão do Toastify
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/Homepage'
import CadastroPage from './pages/CadastroPage'
import ListaClientesPage from './pages/ListaClientes' // C maiúsculo se a pasta tiver C maiúsculo!

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Rota inicial da aplicação */}
          <Route path='/' element={<HomePage />} />
          
          {/* Rota do cadastro e lista */}
          <Route path='/cadastro' element={<CadastroPage />} />
          <Route path='/lista' element={<ListaClientesPage />} />
        </Routes>
        
        {/* ToastContainer movido para fora do <Routes>! */}
        <ToastContainer autoClose={3000} />
      </main>
      <Footer />
    </>
  )
}

export default App