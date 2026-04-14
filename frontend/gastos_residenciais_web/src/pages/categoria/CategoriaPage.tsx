import { usePageCategoria } from "../../hooks";
import { CategoriaForm } from "./CategoriaForm";
import { CategoriaList } from "./CategoriaList";
import "../../App.css";

export const CategoriaPage = () => {
  const {
    categorias,
    loading,
    error,
    handleCreate,
    setError,
  } = usePageCategoria();

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Gerenciar Categorias</h1>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="button-x" onClick={() => setError(null)}>
              X
            </button>
          </div>
        )}

        <CategoriaForm
          onSubmit={handleCreate}
          loading={loading}
          initialData={undefined}
        />

        <h2 className="section-title">Categorias Cadastradas</h2>

        <CategoriaList
          categorias={categorias}
          carregando={loading}
        />
      </div>
    </div>
  );
};
