import { usePageTransacao } from "../../hooks";
import { TransacaoForm } from "./TransacaoForm";
import { TransacaoList } from "./TransacaoList";
import "../../App.css";

export const TransacaoPage = () => {
  const {
    transacoes,
    loading,
    error,
    handleCreateOrUpdate,
    setError,
  } = usePageTransacao();

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Gerenciar Transações</h1>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="button-x" onClick={() => setError(null)}>
              X
            </button>
          </div>
        )}

        <TransacaoForm
          onSubmit={handleCreateOrUpdate}
          loading={loading}
          initialData={undefined}
        />

        <h2 className="section-title">Transações Registradas</h2>

        <TransacaoList
          transacoes={transacoes}
          carregando={loading}
        />
      </div>
    </div>
  );
};
