using System.Collections.Generic;
using System.Threading.Tasks;

namespace GastosResidenciais.Model.Business;

public interface IPessoaBusiness
{
    Task<IList<PessoaPesquisaDto>> Pesquisar();
    Task<PessoaPesquisaDto?> PesquisarPorId(int id);
    Task<PessoaConsultaTotalDto> PesquisarComTotais();
    Task Salvar(PessoaDto pessoa);
    Task Atualizar(int id, PessoaDto pessoa);
    Task Deletar(int id);
}