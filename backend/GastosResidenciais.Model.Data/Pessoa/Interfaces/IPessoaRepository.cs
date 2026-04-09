namespace GastosResidenciais.Model.Data;

public interface IPessoaRepository
{
    Task<IList<Pessoa>> GetAll();
    Task Add(Pessoa pessoa);
}