using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de transações financeiras.
/// </summary>
/// <remarks>
/// Permite o cadastro e consulta de transações,
/// aplicando regras de negócio como validação de idade e consistência de categoria.
/// </remarks>
[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoBusiness _transacaoBusiness;

    /// <summary>
    /// Construtor do controller de transações.
    /// </summary>
    /// <param name="transacaoBusiness">
    /// Serviço responsável pelas regras de negócio relacionadas às transações.
    /// </param>
    public TransacaoController(ITransacaoBusiness transacaoBusiness)
    {
        _transacaoBusiness = transacaoBusiness;
    }

    /// <summary>
    /// Retorna todas as transações cadastradas
    /// </summary>
    /// <remarks>
    /// Lista todas as transações do sistema, incluindo informações
    /// como valor, tipo, categoria e pessoa associada
    /// </remarks>
    /// <returns>Lista de transações</returns>
    /// <response code="200">Lista retornada com sucesso</response>
    /// <response code="400">Erro ao processar a requisição</response>
    [HttpGet]
    public virtual async Task<IActionResult> GetAll()
    {
        try
        {
            IList<TransacaoPesquisaDto> resultado = await _transacaoBusiness.Pesquisar();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    /// <summary>
    /// Cria uma nova transação
    /// </summary>
    /// <remarks>
    /// Realiza o cadastro de uma transação financeira
    ///
    /// Validações importantes:
    ///
    /// 1. Pessoas com menos de 18 anos só podem possuir transações do tipo Despesa
    /// 2. Validação de categoria:
    /// - Se a transação for Receita:
    ///     - A categoria deve permitir Receita ou Ambas
    /// - Se a transação for Despesa:
    ///     - A categoria deve permitir Despesa ou Ambas
    /// </remarks>
    /// <param name="transacao">Dados da transação</param>
    /// <returns>Mensagem de confirmação</returns>
    /// <response code="201">Transação criada com sucesso</response>
    /// <response code="400">Erro de validação ou regra de negócio</response>
    [HttpPost]
    public virtual async Task<IActionResult> Post(TransacaoDto transacao)
    {
        try
        {
            await _transacaoBusiness.Salvar(transacao);
            return Created(string.Empty, new { mensagem = "Transação criada com sucesso." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}