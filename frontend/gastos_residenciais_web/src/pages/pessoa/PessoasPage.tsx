import { usePagePessoa } from "../../hooks";
import { PessoaForm } from "./PessoaForm";
import { PessoaList } from "./PessoaList";
import "../../App.css";

export const PessoasPage = () => {
  const {
    pessoas,
    loading,
    error,
    editingId,
    editingData,
    handleCreateOrUpdate,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    setError,
  } = usePagePessoa();

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Gerenciar Pessoas</h1>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="button-x" onClick={() => setError(null)}>
              X
            </button>
          </div>
        )}

        <PessoaForm
          onSubmit={handleCreateOrUpdate}
          loading={loading}
          initialData={editingData || undefined}
        />

        {editingId && (
          <div className="alert alert-info">
            <span>Editando pessoa (ID: {editingId})</span>
            <button className="button-x" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        )}

        <h2 className="section-title">Pessoas Cadastradas</h2>

        <PessoaList
          pessoas={pessoas}
          onEdit={handleEdit}
          onDelete={handleDelete}
          carregando={loading}
        />
      </div>
    </div>
  );
};
