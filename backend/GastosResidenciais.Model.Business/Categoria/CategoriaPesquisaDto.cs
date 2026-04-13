using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Model.Business;

public class CategoriaPesquisaDto
{
    public int Id { get; set; }
    public string? Descricao { get; set; }
    public Finalidade Finalidade { get; set; }
}