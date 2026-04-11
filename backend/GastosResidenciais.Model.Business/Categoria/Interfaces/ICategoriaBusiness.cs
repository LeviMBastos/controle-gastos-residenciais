namespace GastosResidenciais.Model.Business;

public interface ICategoriaBusiness 
{
    Task Salvar(CategoriaDto categoria);
    Task<IList<CategoriaPesquisaDto>> Pesquisar();
}
