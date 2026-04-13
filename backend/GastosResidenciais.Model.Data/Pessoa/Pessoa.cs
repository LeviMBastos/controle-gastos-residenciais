using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Model.Data;

public class Pessoa 
{
    public int Id { get; set;}
    
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = null!;
    public int Idade { get; set; }
    
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}