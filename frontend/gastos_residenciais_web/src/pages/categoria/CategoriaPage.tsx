import { useState, useEffect } from "react";
import type { CategoriaDto, CategoriaPesquisaDto } from "../../types";
import { categoriaService } from "../../services/categoria";
import { CategoriaForm } from "./CategoriaForm";
import { CategoriaList } from "./CategoriaList";
import "../../App.css";

export const CategoriaPage = () => {
  const [categorias, setCategorias] = useState<CategoriaPesquisaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<CategoriaDto | null>(null);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriaService.listar();
      setCategorias(data);
    } catch (err: any) {
      setError(
        err.response?.data?.mensagem || "Erro ao carregar categorias"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleCreateOrUpdate = async (categoria: CategoriaDto) => {
    try {
      setLoading(true);
      setError(null);

      if (editingId) {
        await categoriaService.atualizar(editingId, categoria);
        setEditingId(null);
        setEditingData(null);
      } else {
        await categoriaService.criar(categoria);
      }

      await carregarCategorias();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao salvar categoria");
    } finally {
      setLoading(false);
    }
  };

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
          onSubmit={handleCreateOrUpdate}
          loading={loading}
          initialData={editingData || undefined}
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
