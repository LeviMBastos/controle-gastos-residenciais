namespace GastosResidenciais.Model.Data;

public interface IPessoaRepository
{
    Task Salvar(PessoaEntity pessoa);
}