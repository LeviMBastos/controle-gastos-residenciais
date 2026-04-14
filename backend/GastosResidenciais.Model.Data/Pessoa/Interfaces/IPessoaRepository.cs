namespace GastosResidenciais.Model.Data;

public interface IPessoaRepository
{
    Task<IList<Pessoa>> GetAll();
    Task<Pessoa?> GetById(int id);
    Task<Pessoa?> GetByIdComTransacoes(int id);
    Task<IList<Pessoa>> GetAllComTransacoes();
    Task Add(Pessoa pessoa);
    Task Update(Pessoa pessoa);
    Task Delete(Pessoa pessoa);
}