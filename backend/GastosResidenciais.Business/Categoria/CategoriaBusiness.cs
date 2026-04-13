using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GastosResidenciais.Model.Business;
using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Business;

public class CategoriaBusiness : ICategoriaBusiness
{
    private readonly ICategoriaRepository _categoriaRepository;

    public CategoriaBusiness(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task<IList<CategoriaPesquisaDto>> Pesquisar()
    {
        IList<Categoria> categorias = await _categoriaRepository.GetAll();

        if (categorias == null)
            return new List<CategoriaPesquisaDto>();

        return categorias.Select(Map).ToList();
    }

    public async Task<CategoriaConsultaTotalDto> PesquisarComTotais()
    {
        IList<Categoria> categorias = await _categoriaRepository.GetAllComTransacoes();

        if (categorias == null || categorias.Count == 0)
            return new CategoriaConsultaTotalDto();

        CategoriaConsultaTotalDto retorno = new CategoriaConsultaTotalDto
        {
            Categorias = new List<CategoriaConsultaTotalIndividualDto>(),
            TotalGeral = new TotalGeralDto()
        };

        foreach (Categoria categoria in categorias)
        {
            decimal totalReceitas = categoria.Transacoes?
                                          .Where(tran => tran.Tipo == Tipo.Receita)
                                          .Sum(tran => tran.Valor) ?? 0;

            decimal totalDespesas = categoria.Transacoes?
                                          .Where(tran => tran.Tipo == Tipo.Despesa)
                                          .Sum(tran => tran.Valor) ?? 0;

            decimal saldo = totalReceitas - totalDespesas;

            retorno.Categorias.Add(Map(categoria, totalReceitas, totalDespesas, saldo));

            retorno.TotalGeral.TotalReceitasGeral += totalReceitas;
            retorno.TotalGeral.TotalDespesasGeral += totalDespesas;
        }

        retorno.TotalGeral.SaldoLiquido = retorno.TotalGeral.TotalReceitasGeral - retorno.TotalGeral.TotalDespesasGeral;

        return retorno;
    }

    public async Task Salvar(CategoriaDto categoria)
    {
        if (categoria == null)
            throw new ArgumentNullException(nameof(categoria), "Categoria não pode ser nula.");

        if (string.IsNullOrWhiteSpace(categoria.Descricao))
            throw new ArgumentException("Descrição é obrigatória.", nameof(categoria.Descricao));

        if (categoria.Descricao.Length > CategoriaConstantes.DescricaoComprimentoMaximo)
            throw new ArgumentException($"Descrição deve ter no máximo {CategoriaConstantes.DescricaoComprimentoMaximo} caracteres.", nameof(categoria.Descricao));

        if (!Enum.IsDefined(typeof(Finalidade), categoria.Finalidade))
            throw new ArgumentException("Finalidade inválida.", nameof(categoria.Finalidade));

        await _categoriaRepository.Add(Map(categoria));
    }

    #region Map

    private static Categoria Map(CategoriaDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        Categoria categoria = new Categoria();
        categoria.Descricao = dto.Descricao ?? string.Empty;
        categoria.Finalidade = dto.Finalidade;
        
        return categoria;
    }

    private static CategoriaPesquisaDto Map(Categoria entidade)
    {
        if (entidade == null)
            throw new ArgumentNullException(nameof(entidade));

        CategoriaPesquisaDto categoriaPesquisa = new CategoriaPesquisaDto();
        categoriaPesquisa.Id = entidade.Id;
        categoriaPesquisa.Descricao = entidade.Descricao ?? string.Empty;
        categoriaPesquisa.Finalidade = entidade.Finalidade;

        return categoriaPesquisa;
    }

    private static CategoriaConsultaTotalIndividualDto Map(Categoria entidade, decimal totalReceitas, decimal totalDespesas, decimal saldo)
    {
        if (entidade == null)
            throw new ArgumentNullException(nameof(entidade));

        CategoriaConsultaTotalIndividualDto categoria = new CategoriaConsultaTotalIndividualDto();
        categoria.Descricao = entidade.Descricao ?? string.Empty;
        categoria.Finalidade = entidade.Finalidade;
        categoria.TotalReceitas = totalReceitas;
        categoria.TotalDespesas = totalDespesas;
        categoria.Saldo = saldo;

        return categoria;
    }

    #endregion Map
}