using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Model.Data;

public class Categoria 
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(400)]
    public string Descricao { get; set; }
    public Finalidade Finalidade { get; set; }
}