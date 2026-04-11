using GastosResidenciais.Model.Business;
using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Business;

public class CategoriaBusiness : ICategoriaBusiness
{
    private readonly ICategoriaRepository _cargaRepository;

    public CategoriaBusiness(ICategoriaRepository categoriaRepository)
    {
        _cargaRepository = categoriaRepository;
    }

    public async Task<IList<CategoriaPesquisaDto>> Pesquisar()
    {
        IList<Categoria> categorias = await _cargaRepository.GetAll();
        return categorias.Select(categoria => Map(categoria)).ToList();
    }

    public async Task Salvar(CategoriaDto categoria)
    {
        await _cargaRepository.Add(Map(categoria));
    }

    #region Map

    private static Categoria Map(CategoriaDto dto)
    {
        Categoria categoria = new Categoria();
        categoria.Descricao = dto.Descricao;
        categoria.Finalidade = dto.Finalidade;

        return categoria;
    }

    private static CategoriaPesquisaDto Map(Categoria entidade)
    {
        CategoriaPesquisaDto categoria = new CategoriaPesquisaDto();
        categoria.Id = entidade.Id;
        categoria.Descricao = entidade.Descricao;
        categoria.Finalidade = entidade.Finalidade;

        return categoria;
    }

    #endregion Map
}