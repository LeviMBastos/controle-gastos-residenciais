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
        return Ok(await _cargaBusiness.Pesquisar());
    }

    [HttpPost]
    public virtual async Task<IActionResult> Post(CategoriaDto categoria)
    {
        Console.WriteLine(categoria.Finalidade);
        await _cargaBusiness.Salvar(categoria);
        return Ok();
    }
}