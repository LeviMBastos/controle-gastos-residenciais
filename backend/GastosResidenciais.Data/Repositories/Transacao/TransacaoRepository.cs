using System.Collections.Generic;
using System.Threading.Tasks;
using GastosResidenciais.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Data;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;

    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Transacao>> GetAll()
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .ToListAsync();
    }

    public async Task Add(Transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        await _context.SaveChangesAsync();
    }
}