import { useState, useEffect } from "react";
import type { CategoriaDto } from "../../types";
import { Finalidade } from "../../types/enums";
import "../../App.css";

interface CategoriaFormProps {
  onSubmit: (categoria: CategoriaDto) => Promise<void>;
  loading?: boolean;
  initialData?: CategoriaDto;
}

export const CategoriaForm = ({
  onSubmit,
  loading = false,
  initialData,
}: CategoriaFormProps) => {
  const normalizarFinalidade = (finalidade: string | number): Finalidade => {
    if (typeof finalidade === "number") {
      return finalidade as Finalidade;
    }

    switch (finalidade.toLowerCase()) {
      case "receita":
        return Finalidade.Receita;
      case "despesa":
        return Finalidade.Despesa;
      case "ambas":
        return Finalidade.Ambas;
      default:
        return Finalidade.Ambas;
    }
  };

  const [formData, setFormData] = useState<CategoriaDto>(
    initialData
      ? {
          descricao: initialData.descricao,
          finalidade: normalizarFinalidade(initialData.finalidade),
        }
      : {
          descricao: "",
          finalidade: Finalidade.Ambas,
        }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        descricao: initialData.descricao,
        finalidade: normalizarFinalidade(initialData.finalidade),
      });
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "finalidade" ? (parseInt(value) as Finalidade) : value,
    }));
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
        finalidade: Finalidade.Ambas,
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Erro ao salvar categoria" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="section-title">
        {initialData ? "Editar Categoria" : "Cadastrar Nova Categoria"}
      </h2>

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
        <label className="label">Finalidade *</label>
        <select
          name="finalidade"
          value={formData.finalidade.toString()}
          onChange={handleChange}
          disabled={loading}
          className="input"
        >
          <option value={Finalidade.Receita.toString()}>Receita</option>
          <option value={Finalidade.Despesa.toString()}>Despesa</option>
          <option value={Finalidade.Ambas.toString()}>Ambas</option>
        </select>
        {errors.finalidade && <span>{errors.finalidade}</span>}
      </div>

      <button type="submit" disabled={loading} className="button">
        {loading ? "Processando..." : initialData ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
};
