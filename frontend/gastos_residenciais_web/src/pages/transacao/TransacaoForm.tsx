import type { TransacaoDto } from "../../types";
import { Tipo } from "../../types/enums";
import { useFormTransacao } from "../../hooks";
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
  const {
    formData,
    valorDisplay,
    errors,
    pessoas,
    categorias,
    handleChange,
    handleBlurValor,
    handleSubmit,
  } = useFormTransacao(initialData);

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="box">
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
          onBlur={handleBlurValor}
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
