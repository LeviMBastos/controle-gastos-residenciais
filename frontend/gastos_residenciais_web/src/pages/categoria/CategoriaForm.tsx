import type { CategoriaDto } from "../../types";
import { Finalidade } from "../../types/enums";
import { useFormCategoria } from "../../hooks";
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
  const { formData, errors, handleChange, handleSubmit } =
    useFormCategoria(initialData);

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="box">
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
