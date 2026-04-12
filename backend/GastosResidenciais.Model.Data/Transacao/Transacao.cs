using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Model.Data;

public class Transacao
{
    public int Id { get; set; }

    [Required]
    [MaxLength(400)]
    public string Descricao { get; set; } = null!;

    public decimal Valor { get; set; }

    public Tipo Tipo { get; set; }

    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;

    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; } = null!;
}