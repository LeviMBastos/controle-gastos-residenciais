using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosResidenciais.Model.Data;

public interface ITransacaoRepository
{
    Task<IList<Transacao>> GetAll();
    Task Add(Transacao transacao);
}