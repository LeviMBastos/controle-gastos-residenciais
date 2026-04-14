import { useState, useEffect } from "react";
import type { TransacaoDto, TransacaoPesquisaDto } from "../../types";
import { transacaoService } from "../../services/transacao";
import { TransacaoForm } from "./TransacaoForm";
import { TransacaoList } from "./TransacaoList";
import "../../App.css";

export const TransacaoPage = () => {
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
          onSubmit={handleCreate}
          loading={loading}
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
