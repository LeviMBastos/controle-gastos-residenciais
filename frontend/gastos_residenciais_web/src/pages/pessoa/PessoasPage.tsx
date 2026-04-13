import { useState, useEffect } from "react";
import type { PessoaDto, PessoaPesquisaDto } from "../../types";
import { pessoaService } from "../../services/pessoa";
import { PessoaForm } from "./PessoaForm";
import { PessoaList } from "./PessoaList";
import "../../App.css";

export const PessoasPage = () => {
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

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Gerenciar Pessoas</h1>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
            <button onClick={() => setError(null)}>X</button>
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
            <button onClick={handleCancelEdit}>Cancelar</button>
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
