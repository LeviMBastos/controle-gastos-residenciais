namespace GastosResidenciais.Model.Data;

public interface ICategoriaRepository
{
   Task Add(Categoria categoria);
   Task<IList<Categoria>> GetAll();
}