using GastosResidenciais.Model.Business;
using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Business;

public class PessoaBusiness : IPessoaBusiness
{
    private readonly IPessoaRepository _pessoaRepository;

    public PessoaBusiness(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }


    public async Task Salvar(PessoaDto pessoa)
    {
        
    }
}