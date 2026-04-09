using System;
using System.Linq;
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

    public async Task<IList<PessoaPesquisaDto>> Pesquisar()
    {
        IList<Pessoa> pessoas = await _pessoaRepository.GetAll();
        return pessoas.Select(pessoa => Map(pessoa)).ToList();
    }

    public async Task Salvar(PessoaDto pessoa)
    {
        await _pessoaRepository.Add(Map(pessoa));
    }

    #region Map

    private Pessoa Map(PessoaDto dto)
    {
        Pessoa pessoa = new Pessoa();
        pessoa.Nome = dto.Nome;
        pessoa.Idade = dto.Idade;

        return pessoa;
    }

    private PessoaPesquisaDto Map(Pessoa entidade)
    {
        PessoaPesquisaDto pessoa = new PessoaPesquisaDto();
        pessoa.Id = entidade.Id;
        pessoa.Nome = entidade.Nome;
        pessoa.Idade = entidade.Idade;

        return pessoa;
    }

    #endregion Map
}