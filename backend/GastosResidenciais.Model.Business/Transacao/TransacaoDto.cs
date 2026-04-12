using System.ComponentModel.DataAnnotations;
using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Model.Business;

public class TransacaoDto
{
    [Required]
    [MaxLength(400)]
    public string Descricao { get; set; } = null!;

    [Range(0.01, double.MaxValue)]
    public decimal Valor { get; set; }

    public Tipo Tipo { get; set; }

    public int CategoriaId { get; set; }

    public int PessoaId { get; set; }
} 