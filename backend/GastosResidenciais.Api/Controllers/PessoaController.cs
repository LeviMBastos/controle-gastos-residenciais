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

    [HttpGet("{id}")]
    public virtual async Task<IActionResult> GetById(int id)
    {
        return Ok(await _pessoaBusiness.PesquisarPorId(id));
    }

    [HttpGet("TotaisTransacoes")]
    public virtual async Task<IActionResult> GetTotais()
    {
        try
        {
            PessoaConsultaTotalDto resultado = await _pessoaBusiness.PesquisarComTotais();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { mensagem = "Erro ao buscar totais de pessoas.", erro = ex.Message });
        }
    }

    [HttpPost]
    public virtual async Task<IActionResult> Post(PessoaDto pessoa)
    {
        await _pessoaBusiness.Salvar(pessoa);
        return Ok();
    }

    [HttpPut("{id}")]
    public virtual async Task<IActionResult> Put(int id, PessoaDto pessoa)
    {
        await _pessoaBusiness.Atualizar(id, pessoa);
        return Ok();
    }

    [HttpDelete("{id}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        await _pessoaBusiness.Deletar(id);
        return Ok();
    }
}