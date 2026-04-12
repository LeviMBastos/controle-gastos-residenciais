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
        return Ok(await _transacaoBusiness.Pesquisar());
    }

    [HttpPost]
    public virtual async Task<IActionResult> Post(TransacaoDto transacao)
    {
        await _transacaoBusiness.Salvar(transacao);
        return Ok();
    }
}