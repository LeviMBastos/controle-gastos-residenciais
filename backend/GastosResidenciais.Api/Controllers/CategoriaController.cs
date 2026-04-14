using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de categorias.
/// </summary>
/// <remarks>
/// Permite operações de cadastro, listagem e consulta de totais por categoria.
/// Atua como camada de entrada da API, delegando regras de negócio para a camada Business.
/// </remarks>
[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly ICategoriaBusiness _categoriaBusiness;

    /// <summary>
    /// Construtor do controller de categorias.
    /// </summary>
    /// <param name="categoriaBusiness">
    /// Serviço responsável pelas regras de negócio relacionadas às categorias.
    /// </param>
    public CategoriaController(ICategoriaBusiness categoriaBusiness)
    {
        _categoriaBusiness = categoriaBusiness;
    }

    /// <summary>
    /// Retorna todas as categorias cadastradas
    /// </summary>
    /// <remarks>
    /// Esta operação realiza a listagem de todas as categorias disponíveis no sistema
    /// Cada categoria contém sua descrição e finalidade (receita, despesa ou ambas)
    /// </remarks>
    /// <returns>Lista de categorias cadastradas</returns>
    /// <response code="200">Lista retornada com sucesso</response>
    /// <response code="400">Erro ao processar a requisição</response>
    [HttpGet]
    public virtual async Task<IActionResult> GetAll()
    {
        try
        {
            IList<CategoriaPesquisaDto> resultado = await _categoriaBusiness.Pesquisar();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    /// <summary>
    /// Retorna os totais de transações agrupados por categoria
    /// </summary>
    /// <remarks>
    /// Esta operação calcula os totais financeiros para cada categoria cadastrada
    ///
    /// Regras aplicadas:
    /// - Soma todas as receitas associadas à categoria
    /// - Soma todas as despesas associadas à categoria
    /// - Calcula o saldo (Receitas - Despesas)
    /// - Retorna também o total geral consolidado de todas as categorias
    /// </remarks>
    /// <returns>Totais de transações por categoria, incluindo total geral</returns>
    /// <response code="200">Totais calculados com sucesso</response>
    /// <response code="400">Erro ao processar a requisição</response>
    [HttpGet("TotaisTransacoes")]
    public virtual async Task<IActionResult> GetTotais()
    {
        try
        {
            CategoriaConsultaTotalDto resultado = await _categoriaBusiness.PesquisarComTotais();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    /// <summary>
    /// Cria uma nova categoria
    /// </summary>
    /// <remarks>
    /// Esta operação realiza o cadastro de uma nova categoria no sistema
    ///
    /// Regras de negócio:
    /// - A descrição deve possuir no máximo 400 caracteres
    /// - A finalidade deve ser definida como:
    ///     - Receita
    ///     - Despesa
    ///     - Ambas
    /// </remarks>
    /// <param name="categoria">Objeto contendo os dados da categoria</param>
    /// <returns>Mensagem de confirmação da criação</returns>
    /// <response code="201">Categoria criada com sucesso</response>
    /// <response code="400">Erro de validação ou regra de negócio</response>
    [HttpPost]
    public virtual async Task<IActionResult> Post(CategoriaDto categoria)
    {
        try
        {
            await _categoriaBusiness.Salvar(categoria);
            return Created(string.Empty, new { mensagem = "Categoria criada com sucesso." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}