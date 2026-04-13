namespace GastosResidenciais.Model.Business;

public class CategoriaConsultaTotalDto
{
    public IList<CategoriaConsultaTotalIndividualDto>? Categorias { get; set; }
    public TotalGeralDto? TotalGeral { get; set; }
}
