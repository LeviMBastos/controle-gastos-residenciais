namespace GastosResidenciais.Model.Business;

public interface IPessoaBusiness
{
    Task Salvar(PessoaDto pessoa);
}