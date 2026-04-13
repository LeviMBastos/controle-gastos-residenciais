using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly ICategoriaBusiness _cargaBusiness;

    public CategoriaController(ICategoriaBusiness categoriaBusiness)
    {
        _cargaBusiness = categoriaBusiness;
    }

    [HttpGet]
    public virtual async Task<IActionResult> GetAll()
    {
        try
        {
            IList<CategoriaPesquisaDto> resultado = await _cargaBusiness.Pesquisar();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { mensagem = "Erro ao listar categorias.", erro = ex.Message });
        }
    }

    [HttpPost]
    public virtual async Task<IActionResult> Post(CategoriaDto categoria)
    {
        try
        {
            await _cargaBusiness.Salvar(categoria);
            return Created(string.Empty, new { mensagem = "Categoria criada com sucesso." });
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { mensagem = "Erro ao criar categoria.", erro = ex.Message });
        }
    }
}