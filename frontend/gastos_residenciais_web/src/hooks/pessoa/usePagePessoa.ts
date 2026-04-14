import { useState, useEffect } from "react";
import type { PessoaDto, PessoaPesquisaDto } from "../../types";
import { pessoaService } from "../../services/pessoa";

interface UsePagePessoaReturn {
  pessoas: PessoaPesquisaDto[];
  loading: boolean;
  error: string | null;
  editingId: number | null;
  editingData: PessoaDto | null;
  carregarPessoas: () => Promise<void>;
  handleCreateOrUpdate: (pessoa: PessoaDto) => Promise<void>;
  handleEdit: (pessoa: PessoaPesquisaDto) => void;
  handleDelete: (id: number) => Promise<void>;
  handleCancelEdit: () => void;
  setError: (error: string | null) => void;
}

export const usePagePessoa = (): UsePagePessoaReturn => {
  const [pessoas, setPessoas] = useState<PessoaPesquisaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<PessoaDto | null>(null);

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pessoaService.listar();
      setPessoas(data);
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao carregar pessoas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const handleCreateOrUpdate = async (pessoa: PessoaDto) => {
    try {
      setLoading(true);
      setError(null);

      if (editingId) {
        await pessoaService.atualizar(editingId, pessoa);
        setEditingId(null);
        setEditingData(null);
      } else {
        await pessoaService.criar(pessoa);
      }

      await carregarPessoas();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao salvar pessoa");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pessoa: PessoaPesquisaDto) => {
    setEditingId(pessoa.id);
    setEditingData({
      nome: pessoa.nome,
      idade: pessoa.idade,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await pessoaService.deletar(id);
      await carregarPessoas();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao deletar pessoa");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  return {
    pessoas,
    loading,
    error,
    editingId,
    editingData,
    carregarPessoas,
    handleCreateOrUpdate,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    setError,
  };
};
