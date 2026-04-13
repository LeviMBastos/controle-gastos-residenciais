import { useState } from "react";
import type { PessoaDto } from "../../types";
import "../../App.css";

interface PessoaFormProps {
  onSubmit: (pessoa: PessoaDto) => Promise<void>;
  loading?: boolean;
  initialData?: PessoaDto;
}

export const PessoaForm = ({
  onSubmit,
  loading = false,
  initialData,
}: PessoaFormProps) => {
  const [formData, setFormData] = useState<PessoaDto>(
    initialData || {
      nome: "",
      idade: 0,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idade" ? parseInt(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome || formData.nome.trim().length === 0) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.length > 200) {
      newErrors.nome = "Nome deve ter no máximo 200 caracteres";
    }

    if (formData.idade < 0 || formData.idade > 150) {
      newErrors.idade = "Idade deve estar entre 0 e 150";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({ nome: "", idade: 0 });
      setErrors({});
    } catch (error) {
      setErrors({ submit: "Erro ao salvar pessoa" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="section-title">
        {initialData ? "Editar Pessoa" : "Cadastrar Nova Pessoa"}
      </h2>

      {errors.submit && (
        <div className="alert alert-error">{errors.submit}</div>
      )}

      <div className="input-group">
        <label className="label">Nome *</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          disabled={loading}
          className="input"
        />
        {errors.nome && <span>{errors.nome}</span>}
      </div>

      <div className="input-group">
        <label className="label">Idade *</label>
        <input
          type="number"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          disabled={loading}
          className="input"
        />
        {errors.idade && <span>{errors.idade}</span>}
      </div>

      <button type="submit" disabled={loading} className="button">
        {loading ? "Processando..." : initialData ? "Atualizar" : "Cadastrar"}
      </button>
    </form>
  );
};
