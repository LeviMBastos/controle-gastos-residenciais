using GastosResidenciais.Model.Business;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

/// <summary>
/// Controller responsável pelo gerenciamento de pessoas.
/// </summary>
/// <remarks>
/// Permite operações de cadastro, edição, remoção e consulta de pessoas,
/// além da visualização de totais financeiros por pessoa.
/// </remarks>
[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaBusiness _pessoaBusiness;

    /// <summary>
    /// Construtor do controller de pessoas.
    /// </summary>
    /// <param name="pessoaBusiness">
    /// Serviço responsável pelas regras de negócio relacionadas às pessoas.
    /// </param>
    public PessoaController(IPessoaBusiness pessoaBusiness)
    {
        _pessoaBusiness = pessoaBusiness;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas
    /// </summary>
    /// <remarks>
    /// Esta operação lista todas as pessoas registradas no sistema,
    /// contendo suas informações básicas (nome e idade)
    /// </remarks>
    /// <returns>Lista de pessoas</returns>
    /// <response code="200">Lista retornada com sucesso</response>
    /// <response code="400">Erro ao processar a requisição</response>
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

    /// <summary>
    /// Retorna uma pessoa específica pelo ID
    /// </summary>
    /// <param name="id">ID da pessoa a ser buscada</param>
    /// <returns>Informações da pessoa</returns>
    /// <response code="200">Pessoa encontrada com sucesso</response>
    /// <response code="404">Pessoa não encontrada</response>
    /// <response code="400">Erro ao processar a requisição</response>
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


    /// <summary>
    /// Retorna os totais de transações por pessoa
    /// </summary>
    /// <remarks>
    /// Esta operação calcula os totais financeiros de cada pessoa
    ///
    /// Regras aplicadas:
    /// - Soma todas as receitas associadas à pessoa
    /// - Soma todas as despesas associadas à pessoa
    /// - Calcula o saldo (Receitas - Despesas)
    /// - Retorna também o total geral consolidado de todas as pessoas
    /// </remarks>
    /// <returns>Totais de transações por pessoa</returns>
    /// <response code="200">Totais calculados com sucesso</response>
    /// <response code="400">Erro ao processar a requisição</response>
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

    /// <summary>
    /// Cria uma nova pessoa
    /// </summary>
    /// <remarks>
    /// Realiza o cadastro de uma pessoa no sistema
    ///
    /// Regras de negócio:
    /// - O nome deve possuir no máximo 200 caracteres
    /// - A idade deve ser um valor válido
    /// </remarks>
    /// <param name="pessoa">Dados da pessoa</param>
    /// <returns>Mensagem de confirmação</returns>
    /// <response code="201">Pessoa criada com sucesso</response>
    /// <response code="400">Erro de validação</response>
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

    /// <summary>
    /// Atualiza os dados de uma pessoa
    /// </summary>
    /// <remarks>
    /// Atualiza as informações de uma pessoa existente
    ///
    /// Regras:
    /// - A pessoa deve existir
    /// - Os dados informados devem respeitar as validações de domínio
    /// </remarks>
    /// <param name="id">Identificador da pessoa</param>
    /// <param name="pessoa">Novos dados da pessoa</param>
    /// <returns>Mensagem de confirmação</returns>
    /// <response code="200">Pessoa atualizada com sucesso</response>
    /// <response code="404">Pessoa não encontrada</response>
    /// <response code="400">Erro de validação</response>
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

    /// <summary>
    /// Remove uma pessoa do sistema
    /// </summary>
    /// <remarks>
    /// Realiza a exclusão de uma pessoa
    ///
    /// Regras de negócio:
    /// - A pessoa deve existir
    /// - Caso exista Transações associadas à pessoa, a exclusão não será permitida para evitar inconsistências nos dados
    /// </remarks>
    /// <param name="id">Identificador da pessoa</param>
    /// <returns>Mensagem de confirmação</returns>
    /// <response code="200">Pessoa removida com sucesso</response>
    /// <response code="404">Pessoa não encontrada</response>
    /// <response code="400">Erro ao processar a requisição</response>
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