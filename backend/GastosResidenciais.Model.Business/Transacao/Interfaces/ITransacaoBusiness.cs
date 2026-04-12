using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosResidenciais.Model.Business;

public interface ITransacaoBusiness
{
    Task<IList<TransacaoPesquisaDto>> Pesquisar();
    Task Salvar(TransacaoDto transacao);
}