using GastosResidenciais.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}