import { useState, useEffect } from "react";
import type { CategoriaDto, CategoriaPesquisaDto } from "../../types";
import { categoriaService } from "../../services/categoria";

interface UsePageCategoriaReturn {
  categorias: CategoriaPesquisaDto[];
  loading: boolean;
  error: string | null;
  editingId: number | null;
  editingData: CategoriaDto | null;
  carregarCategorias: () => Promise<void>;
  handleCreateOrUpdate: (categoria: CategoriaDto) => Promise<void>;
  handleEdit: (categoria: CategoriaPesquisaDto) => void;
  handleDelete: (id: number) => Promise<void>;
  handleCancelEdit: () => void;
  setError: (error: string | null) => void;
}

export const usePageCategoria = (): UsePageCategoriaReturn => {
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

  const handleEdit = (categoria: CategoriaPesquisaDto) => {
    setEditingId(categoria.id);
    setEditingData({
      descricao: categoria.descricao,
      finalidade: categoria.finalidade,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await categoriaService.deletar(id);
      await carregarCategorias();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao deletar categoria");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  return {
    categorias,
    loading,
    error,
    editingId,
    editingData,
    carregarCategorias,
    handleCreateOrUpdate,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    setError,
  };
};
