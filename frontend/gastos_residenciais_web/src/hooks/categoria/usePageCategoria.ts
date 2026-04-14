import { useState, useEffect } from "react";
import type { CategoriaDto, CategoriaPesquisaDto } from "../../types";
import { categoriaService } from "../../services/categoria";

interface UsePageCategoriaReturn {
  categorias: CategoriaPesquisaDto[];
  loading: boolean;
  error: string | null;
  carregarCategorias: () => Promise<void>;
  handleCreate: (categoria: CategoriaDto) => Promise<void>;
  setError: (error: string | null) => void;
}

export const usePageCategoria = (): UsePageCategoriaReturn => {
  const [categorias, setCategorias] = useState<CategoriaPesquisaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriaService.listar();
      setCategorias(data);
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleCreate = async (categoria: CategoriaDto) => {
    try {
      setLoading(true);
      setError(null);
      await categoriaService.criar(categoria);
      await carregarCategorias();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao salvar categoria");
    } finally {
      setLoading(false);
    }
  };

  return {
    categorias,
    loading,
    error,
    carregarCategorias,
    handleCreate,
    setError,
  };
};
