using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Model.Business;

public class TransacaoPesquisaDto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = null!;
    public decimal Valor { get; set; }
    public Tipo Tipo { get; set; }
    public int CategoriaId { get; set; }
    public string CategoriaDescricao { get; set; } = null!;
    public Finalidade CategoriaFinalidade { get; set; }
    public int PessoaId { get; set; }
    public string PessoaNome { get; set; } = null!;
    public int PessoaIdade { get; set; }
}