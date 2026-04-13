namespace GastosResidenciais.Model.Business;

public class PessoaConsultaTotalDto
{
    public IList<PessoaConsultaTotalIndividualDto>? Pessoas { get; set; }
    public TotalGeralDto? TotalGeral { get; set; }
}