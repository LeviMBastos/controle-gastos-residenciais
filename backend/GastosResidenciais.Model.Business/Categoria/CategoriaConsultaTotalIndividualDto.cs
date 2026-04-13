using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Model.Business;

public class CategoriaConsultaTotalIndividualDto
{
    public string? Descricao { get; set; }
    public Finalidade Finalidade { get; set; }
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}
