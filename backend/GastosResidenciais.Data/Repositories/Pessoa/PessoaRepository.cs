using GastosResidenciais.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Data;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Pessoa>> GetAll()
    {
        return await _context.Pessoas.ToListAsync();
    }

    public async Task Add(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);  
        await _context.SaveChangesAsync();
    }
}