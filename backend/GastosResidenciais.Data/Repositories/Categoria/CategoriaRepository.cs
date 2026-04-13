using System.Collections.Generic;
using System.Threading.Tasks;
using GastosResidenciais.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Data;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Categoria>> GetAll()
    {
        return await _context.Categorias.ToListAsync();
    }

    public async Task<IList<Categoria>> GetAllComTransacoes()
    {
        return await _context.Categorias
            .Include(c => c.Transacoes)
            .ToListAsync();
    }

    public async Task<Categoria?> GetById(int id)
    {
        return await _context.Categorias.FirstOrDefaultAsync(categoria => categoria.Id == id);
    }

    public async Task Add(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
    }
}