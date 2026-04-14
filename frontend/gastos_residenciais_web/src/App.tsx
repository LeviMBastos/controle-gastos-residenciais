import { useState } from "react";
import { PessoasPage, CategoriaPage, TransacaoPage } from "./pages";
import "./App.css";

type PaginaAtiva = "inicio" | "pessoas" | "categorias" | "transacoes";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>("inicio");

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case "pessoas":
        return <PessoasPage />;
      case "categorias":
        return <CategoriaPage />;
      case "transacoes":
        return <TransacaoPage />;
      default:
        return (
          <div className="container">
            <div className="card">
              <h1 className="title">Gastos Residenciais</h1>

              <div className="grid">
                <button
                  onClick={() => setPaginaAtiva("pessoas")}
                  className="menu-button"
                >
                  <div className="menu-title">Pessoas</div>
                </button>

                <button
                  onClick={() => setPaginaAtiva("categorias")}
                  className="menu-button"
                >
                  <div className="menu-title">Categorias</div>
                </button>

                <button
                  onClick={() => setPaginaAtiva("transacoes")}
                  className="menu-button"
                >
                  <div className="menu-title">Transações</div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderizarPagina();
}

export default App;
