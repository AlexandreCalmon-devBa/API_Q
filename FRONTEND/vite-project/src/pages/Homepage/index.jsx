import './style.css'

export default function HomePage(){
    return (
        <div className='home-page dashboard-layout'>
            
            <header className='dashboard-header'>
                <h1>Customer Journeys</h1>
                <p>Visão geral do gerenciamento de clientes</p>
            </header>

            {/* Aqui criamos a estrutura de blocos (Cards) vista na imagem */}
            <div className='dashboard-grid'>
                
                <section className='card col-span-2'>
                    <h2>Novo Cadastro de Aluno</h2>
                    <div className='card-content'>
                        {/* Conteúdo do fluxo de cadastro viria aqui */}
                        <p>Inicie o processo de matrícula aqui.</p>
                        <button className='btn-primary'>+ Novo Aluno</button>
                    </div>
                </section>

                <section className='card'>
                    <h2>Status das Turmas</h2>
                    <div className='card-content'>
                        {/* Gráficos ou listas viriam aqui */}
                        <p>3 turmas ativas</p>
                    </div>
                </section>

                <section className='card col-span-3'>
                    <h2>Atividades Recentes</h2>
                    <div className='card-content'>
                        {/* Tabela ou lista de clientes recentes */}
                        <p>Nenhuma atividade registrada hoje.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}