namespace GastosResidenciais.Model.Business;

public interface IPessoaBusiness
{
    Task<IList<PessoaPesquisaDto>> Pesquisar();
    Task<PessoaPesquisaDto?> PesquisarPorId(int id);
    Task Salvar(PessoaDto pessoa);
    Task Atualizar(int id, PessoaDto pessoa);
}