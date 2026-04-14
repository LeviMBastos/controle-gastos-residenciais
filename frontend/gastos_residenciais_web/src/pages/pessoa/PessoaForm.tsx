import type { PessoaDto } from "../../types";
import { useFormPessoa } from "../../hooks";
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
  const { formData, errors, handleChange, handleSubmit } =
    useFormPessoa(initialData);

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="box">
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
