using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Model.Data;

public class Pessoa 
{
    public int Id { get; set;}
    
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; }
    public int Idade { get; set; }
}