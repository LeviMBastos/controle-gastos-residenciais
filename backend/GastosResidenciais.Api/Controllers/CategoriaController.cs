using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly ICategoriaBusiness _categoriaBusiness;

    public CategoriaController(ICategoriaBusiness categoriaBusiness)
    {
        _categoriaBusiness = categoriaBusiness;
    }

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