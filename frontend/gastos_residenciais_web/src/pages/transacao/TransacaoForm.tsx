import { useState, useEffect } from "react";
import type { TransacaoDto, PessoaPesquisaDto, CategoriaPesquisaDto } from "../../types";
import { Tipo } from "../../types/enums";
import { pessoaService } from "../../services/pessoa";
import { categoriaService } from "../../services/categoria";
import { formatarMoeda, processarValorDinheiro } from "../../utils/formatters";
import "../../App.css";

interface TransacaoFormProps {
  onSubmit: (transacao: TransacaoDto) => Promise<void>;
  loading?: boolean;
  initialData?: TransacaoDto;
}

export const TransacaoForm = ({
  onSubmit,
  loading = false,
  initialData,
}: TransacaoFormProps) => {
  const [formData, setFormData] = useState<TransacaoDto>(
    initialData || {
      descricao: "",
      valor: 0,
      tipo: Tipo.Despesa,
      categoriaId: 0,
      pessoaId: 0,
    }
  );
  const [valorDisplay, setValorDisplay] = useState<string>(
    initialData ? formatarMoeda(initialData.valor) : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pessoas, setPessoas] = useState<PessoaPesquisaDto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaPesquisaDto[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [pessoasData, categoriasData] = await Promise.all([
          pessoaService.listar(),
          categoriaService.listar(),
        ]);
        setPessoas(pessoasData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao carregar pessoas e categorias", error);
      } finally {
        setLoadingData(false);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setValorDisplay(formatarMoeda(initialData.valor));
      setErrors({});
    } else {
      setFormData({
        descricao: "",
        valor: 0,
        tipo: Tipo.Despesa,
        categoriaId: 0,
        pessoaId: 0,
      });
      setValorDisplay("");
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "valor") {
      const valorNumerico = processarValorDinheiro(value);
      setFormData((prev) => ({
        ...prev,
        valor: valorNumerico,
      }));
      setValorDisplay(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "tipo" || name === "categoriaId" || name === "pessoaId"
            ? parseInt(value) || 0
            : value,
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.descricao || formData.descricao.trim().length === 0) {
      newErrors.descricao = "Descrição é obrigatória";
    } else if (formData.descricao.length > 400) {
      newErrors.descricao = "Descrição deve ter no máximo 400 caracteres";
    }

    if (formData.valor <= 0) {
      newErrors.valor = "Valor deve ser maior que zero";
    }

    if (!formData.tipo || (formData.tipo !== Tipo.Despesa && formData.tipo !== Tipo.Receita)) {
      newErrors.tipo = "Tipo é obrigatório";
    }

    if (!formData.categoriaId || formData.categoriaId === 0) {
      newErrors.categoriaId = "Categoria é obrigatória";
    }

    if (!formData.pessoaId || formData.pessoaId === 0) {
      newErrors.pessoaId = "Pessoa é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({
        descricao: "",
        valor: 0,
        tipo: Tipo.Despesa,
        categoriaId: 0,
        pessoaId: 0,
      });
      setValorDisplay("");
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Erro ao salvar transação" });
    }
  };

  if (loadingData) {
    return <div className="box">Carregando dados...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="section-title">Registrar Nova Transação</h2>

      {errors.submit && (
        <div className="alert alert-error">{errors.submit}</div>
      )}

      <div className="input-group">
        <label className="label">Descrição *</label>
        <input
          type="text"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          disabled={loading}
          className="input"
          maxLength={400}
        />
        {errors.descricao && <span>{errors.descricao}</span>}
      </div>

      <div className="input-group">
        <label className="label">Valor *</label>
        <input
          type="text"
          name="valor"
          value={valorDisplay}
          onChange={handleChange}
          onBlur={() => {
            if (formData.valor > 0) {
              setValorDisplay(formatarMoeda(formData.valor));
            } else {
              setValorDisplay("");
            }
          }}
          disabled={loading}
          className="input"
          placeholder="R$ 0,00"
        />
        {errors.valor && <span>{errors.valor}</span>}
      </div>

      <div className="input-group">
        <label className="label">Tipo *</label>
        <select
          name="tipo"
          value={formData.tipo.toString()}
          onChange={handleChange}
          disabled={loading}
          className="input"
        >
          <option value={Tipo.Despesa.toString()}>Despesa</option>
          <option value={Tipo.Receita.toString()}>Receita</option>
        </select>
        {errors.tipo && <span>{errors.tipo}</span>}
      </div>

      <div className="input-group">
        <label className="label">Categoria *</label>
        <select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
          disabled={loading || categorias.length === 0}
          className="input"
        >
          <option value="0">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.descricao}
            </option>
          ))}
        </select>
        {errors.categoriaId && <span>{errors.categoriaId}</span>}
      </div>

      <div className="input-group">
        <label className="label">Pessoa *</label>
        <select
          name="pessoaId"
          value={formData.pessoaId}
          onChange={handleChange}
          disabled={loading || pessoas.length === 0}
          className="input"
        >
          <option value="0">Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        {errors.pessoaId && <span>{errors.pessoaId}</span>}
      </div>

      <button type="submit" disabled={loading} className="button">
        {loading ? "Processando..." : "Registrar Transação"}
      </button>
    </form>
  );
};
