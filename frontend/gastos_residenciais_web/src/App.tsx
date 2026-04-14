import { useState } from "react";
import { PessoasPage, CategoriaPage, TransacaoPage } from "./pages";
import { TotalPessoasConsulta, TotalCategoriaConsulta } from "./components";
import "./App.css";

type PaginaAtiva = "inicio" | "pessoas" | "categorias" | "transacoes";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>("inicio");

  const renderizarPaginaOperacional = () => {
    switch (paginaAtiva) {
      case "pessoas":
        return <PessoasPage />;
      case "categorias":
        return <CategoriaPage />;
      case "transacoes":
        return <TransacaoPage />;
      default:
        return null;
    }
  };

  const renderizarConteudo = () => {
    if (paginaAtiva !== "inicio") {
      return renderizarPaginaOperacional();
    }

    return (
      <div className="app-container">
        <div className="header">
          <h1 className="app-title">Gastos Residenciais</h1>
        </div>

        <div className="content-wrapper">
          <nav className="sidebar">
            <ul className="menu-list">
              <li>
                <button
                  onClick={() => setPaginaAtiva("pessoas")}
                  className="menu-button"
                >
                  Pessoas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPaginaAtiva("categorias")}
                  className="menu-button"
                >
                  Categorias
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPaginaAtiva("transacoes")}
                  className="menu-button"
                >
                  Transações
                </button>
              </li>
            </ul>
          </nav>

          {/* Área de totais e relatórios */}
          <div className="consultando-area">
            <div className="consulta-container">
              <TotalPessoasConsulta />
            </div>
            <div className="consulta-container">
              <TotalCategoriaConsulta />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Se não estiver na página inicial, volta ao menu
  if (paginaAtiva !== "inicio") {
    return (
      <div className="app-container">
        <div className="header">
          <h1 className="app-title">Gastos Residenciais</h1>
        </div>
        <div className="content-wrapper">
          <nav className="sidebar">
            <ul className="menu-list">
              <li>
                <button
                  onClick={() => setPaginaAtiva("inicio")}
                  className="menu-button back-button"
                >
                  ← Voltar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPaginaAtiva("pessoas")}
                  className={`menu-button ${paginaAtiva === "pessoas" ? "active" : ""}`}
                >
                  Pessoas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPaginaAtiva("categorias")}
                  className={`menu-button ${paginaAtiva === "categorias" ? "active" : ""}`}
                >
                  Categorias
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPaginaAtiva("transacoes")}
                  className={`menu-button ${paginaAtiva === "transacoes" ? "active" : ""}`}
                >
                  Transações
                </button>
              </li>
            </ul>
          </nav>
          <div className="page-container">
            {renderizarPaginaOperacional()}
          </div>
        </div>
      </div>
    );
  }

  return renderizarConteudo();
}

export default App;
