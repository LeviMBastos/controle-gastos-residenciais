import { useState, useEffect } from "react";
import type { TransacaoDto, TransacaoPesquisaDto } from "../../types";
import { transacaoService } from "../../services/transacao";

interface UsePageTransacaoReturn {
  transacoes: TransacaoPesquisaDto[];
  loading: boolean;
  error: string | null;
  editingId: number | null;
  editingData: TransacaoDto | null;
  carregarTransacoes: () => Promise<void>;
  handleCreateOrUpdate: (transacao: TransacaoDto) => Promise<void>;
  handleEdit: (transacao: TransacaoPesquisaDto) => void;
  handleDelete: (id: number) => Promise<void>;
  handleCancelEdit: () => void;
  setError: (error: string | null) => void;
}

export const usePageTransacao = (): UsePageTransacaoReturn => {
  const [transacoes, setTransacoes] = useState<TransacaoPesquisaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<TransacaoDto | null>(null);

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transacaoService.listar();
      setTransacoes(data);
    } catch (err: any) {
      setError(
        err.response?.data?.mensagem || "Erro ao carregar transações"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleCreateOrUpdate = async (transacao: TransacaoDto) => {
    try {
      setLoading(true);
      setError(null);

      if (editingId) {
        await transacaoService.atualizar(editingId, transacao);
        setEditingId(null);
        setEditingData(null);
      } else {
        await transacaoService.criar(transacao);
      }

      await carregarTransacoes();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transacao: TransacaoPesquisaDto) => {
    setEditingId(transacao.id);
    setEditingData({
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoriaId: transacao.categoriaId,
      pessoaId: transacao.pessoaId,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await transacaoService.deletar(id);
      await carregarTransacoes();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao deletar transação");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  return {
    transacoes,
    loading,
    error,
    editingId,
    editingData,
    carregarTransacoes,
    handleCreateOrUpdate,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    setError,
  };
};
