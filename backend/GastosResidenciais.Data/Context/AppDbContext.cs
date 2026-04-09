using GastosResidenciais.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<PessoaEntity> Pessoas { get; set; }
}