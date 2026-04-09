namespace GastosResidenciais.Model.Business;

public interface IPessoaBusiness
{
    Task Salvar(PessoaDto pessoa);
    Task<IList<PessoaPesquisaDto>> Pesquisar();
}