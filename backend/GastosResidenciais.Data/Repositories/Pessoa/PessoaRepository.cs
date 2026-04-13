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

    public async Task<IList<Pessoa>> GetAllComTransacoes()
    {
        return await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();
    }

    public async Task<Pessoa?> GetById(int id)
    {
        return await _context.Pessoas.FirstOrDefaultAsync(pessoa => pessoa.Id == id);
    }

    public async Task Add(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);  
        await _context.SaveChangesAsync();
    }

    public async Task Update(Pessoa pessoa)
    {
        _context.Pessoas.Update(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}