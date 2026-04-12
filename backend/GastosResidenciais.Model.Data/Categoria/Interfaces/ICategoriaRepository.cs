using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosResidenciais.Model.Data;

public interface ICategoriaRepository
{
   Task Add(Categoria categoria);
   Task<IList<Categoria>> GetAll();
   Task<Categoria?> GetById(int id);
}