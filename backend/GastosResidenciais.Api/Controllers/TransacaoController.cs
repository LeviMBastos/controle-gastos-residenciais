using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoBusiness _transacaoBusiness;

    public TransacaoController(ITransacaoBusiness transacaoBusiness)
    {
        _transacaoBusiness = transacaoBusiness;
    }

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