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
        return pessoas.Select(Map).ToList();
    }

    public async Task<PessoaPesquisaDto?> PesquisarPorId(int id)
    {
        Pessoa? pessoa = await _pessoaRepository.GetById(id);
        return pessoa != null ? Map(pessoa) : null;
    }

    public async Task Salvar(PessoaDto pessoa)
    {
        await _pessoaRepository.Add(Map(pessoa));
    }

    public async Task Atualizar(int id, PessoaDto pessoa)
    {
        await _pessoaRepository.Update(Map(pessoa, id));
    }

    public async Task Deletar(int id)
    {
        Pessoa? pessoa = await _pessoaRepository.GetById(id);

        if(pessoa != null)
            await _pessoaRepository.Delete(pessoa);
    }

    #region Map

    private static Pessoa Map(PessoaDto dto, int id = 0)
    {
        Pessoa pessoa = new Pessoa();
        pessoa.Id = id;
        pessoa.Nome = dto.Nome;
        pessoa.Idade = dto.Idade;

        return pessoa;
    }

    private static PessoaPesquisaDto Map(Pessoa entidade)
    {
        PessoaPesquisaDto pessoa = new PessoaPesquisaDto();
        pessoa.Id = entidade.Id;
        pessoa.Nome = entidade.Nome;
        pessoa.Idade = entidade.Idade;

        return pessoa;
    }

    #endregion Map
}