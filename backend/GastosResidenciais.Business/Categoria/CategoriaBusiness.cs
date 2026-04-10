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

    public async Task Salvar(CategoriaDto categoria)
    {
        await _cargaRepository.Add(Map(categoria));
    }

    private static Categoria Map(CategoriaDto categoria)
    {
        Categoria entidade = new Categoria();
        entidade.Descricao = categoria.Descricao;
        entidade.Finalidade = categoria.Finalidade;

        return entidade;
    } 
}