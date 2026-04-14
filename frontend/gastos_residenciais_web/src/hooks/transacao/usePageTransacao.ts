import { useState, useEffect } from "react";
import type { TransacaoDto, TransacaoPesquisaDto } from "../../types";
import { transacaoService } from "../../services/transacao";

interface UsePageTransacaoReturn {
  transacoes: TransacaoPesquisaDto[];
  loading: boolean;
  error: string | null;
  carregarTransacoes: () => Promise<void>;
  handleCreate: (transacao: TransacaoDto) => Promise<void>;
  setError: (error: string | null) => void;
}

export const usePageTransacao = (): UsePageTransacaoReturn => {
  const [transacoes, setTransacoes] = useState<TransacaoPesquisaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transacaoService.listar();
      setTransacoes(data);
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao carregar transações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleCreate = async (transacao: TransacaoDto) => {
    try {
      setLoading(true);
      setError(null);

      await transacaoService.criar(transacao);
      await carregarTransacoes();
    } catch (err: any) {
      setError(err.response?.data?.mensagem || "Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  };

  return {
    transacoes,
    loading,
    error,
    carregarTransacoes,
    handleCreate,
    setError,
  };
};
