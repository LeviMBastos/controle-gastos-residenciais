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
        try
        {
            IList<PessoaPesquisaDto> resultado = await _pessoaBusiness.Pesquisar();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public virtual async Task<IActionResult> GetById(int id)
    {
        try
        {
            PessoaPesquisaDto? resultado = await _pessoaBusiness.PesquisarPorId(id);
            
            if (resultado == null)
                return NotFound(new { mensagem = $"Pessoa com ID {id} não encontrada." });

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
            PessoaConsultaTotalDto resultado = await _pessoaBusiness.PesquisarComTotais();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpPost]
    public virtual async Task<IActionResult> Post(PessoaDto pessoa)
    {
        try
        {
            await _pessoaBusiness.Salvar(pessoa);
            return Created(string.Empty, new { mensagem = "Pessoa criada com sucesso." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public virtual async Task<IActionResult> Put(int id, PessoaDto pessoa)
    {
        try
        {
            await _pessoaBusiness.Atualizar(id, pessoa);
            return Ok(new { mensagem = "Pessoa atualizada com sucesso." });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _pessoaBusiness.Deletar(id);
            return Ok(new { mensagem = "Pessoa deletada com sucesso." });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}