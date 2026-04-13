namespace GastosResidenciais.Model.Business;

public class PessoaConsultaTotalIndividualDto
{
    public string? Nome { get; set; }
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}