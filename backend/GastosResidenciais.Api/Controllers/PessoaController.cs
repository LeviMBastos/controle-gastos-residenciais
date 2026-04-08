using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    [HttpGet]
    public IActionResult Teste()
    {
        return Ok();
    }
}