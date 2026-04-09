using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{

    private readonly IPessoaBusiness _pessoaBusiness;

    public PessoaController(IPessoaBusiness pessoaBusiness)
    {
        _pessoaBusiness = pessoaBusiness;
    }

    [HttpPost]
    public virtual async Task<IActionResult> Salvar(PessoaDto pessoa)
    {
        try
        {
            await _pessoaBusiness.Salvar(pessoa);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }
}