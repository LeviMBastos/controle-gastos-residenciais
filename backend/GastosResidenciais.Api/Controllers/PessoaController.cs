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

    [HttpGet]
    public virtual async Task<IActionResult> GetAll()
    {
        return Ok(await _pessoaBusiness.Pesquisar());
    }

    // [HttpGet("{id}")]
    // public virtual async Task<IActionResult> Get(int id)
    // {
    //     return Response(await _pessoaBusiness.Pesquisar());
    // }

    [HttpPost]
    public virtual async Task<IActionResult> Post(PessoaDto pessoa)
    {
        await _pessoaBusiness.Salvar(pessoa);
        return Ok();
    }
}