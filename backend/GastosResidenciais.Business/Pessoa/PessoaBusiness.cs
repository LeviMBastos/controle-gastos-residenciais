using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        if (pessoas == null)
            return new List<PessoaPesquisaDto>();

        return pessoas.Select(Map).ToList();
    }

    public async Task<PessoaPesquisaDto?> PesquisarPorId(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero.", nameof(id));

        Pessoa? pessoa = await _pessoaRepository.GetById(id);
        return pessoa != null ? Map(pessoa) : null;
    }

    public async Task Salvar(PessoaDto pessoa)
    {
        if (pessoa == null)
            throw new ArgumentNullException(nameof(pessoa), "Pessoa não pode ser nula.");

        ValidarPessoaDto(pessoa);

        await _pessoaRepository.Add(Map(pessoa));
    }

    public async Task Atualizar(int id, PessoaDto pessoa)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero.", nameof(id));

        if (pessoa == null)
            throw new ArgumentNullException(nameof(pessoa), "Pessoa não pode ser nula.");

        ValidarPessoaDto(pessoa);

        Pessoa? pessoaExistente = await _pessoaRepository.GetById(id);
        if (pessoaExistente == null)
            throw new InvalidOperationException($"Pessoa com ID {id} não encontrada.");

        await _pessoaRepository.Update(Map(pessoa, id));
    }

    public async Task Deletar(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero.", nameof(id));

        Pessoa? pessoa = await _pessoaRepository.GetById(id);

        if (pessoa == null)
            throw new InvalidOperationException($"Pessoa com ID {id} não encontrada.");

        await _pessoaRepository.Delete(pessoa);
    }

    private static void ValidarPessoaDto(PessoaDto pessoa)
    {
        if (string.IsNullOrWhiteSpace(pessoa.Nome))
            throw new ArgumentException("Nome é obrigatório.", nameof(pessoa.Nome));

        if (pessoa.Nome.Length > PessoaConstantes.NomeComprimentoMaximo)
            throw new ArgumentException($"Nome deve ter no máximo {PessoaConstantes.NomeComprimentoMaximo} caracteres.", nameof(pessoa.Nome));

        if (pessoa.Idade < PessoaConstantes.IdadeMinima || pessoa.Idade > PessoaConstantes.IdadeMaxima)
            throw new ArgumentException($"Idade deve estar entre {PessoaConstantes.IdadeMinima} e {PessoaConstantes.IdadeMaxima}.", nameof(pessoa.Idade));
    }

    #region Map

    private static Pessoa Map(PessoaDto dto, int id = 0)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        Pessoa pessoa = new Pessoa();
        pessoa.Id = id;
        pessoa.Nome = dto.Nome ?? string.Empty;
        pessoa.Idade = dto.Idade;
        
        return pessoa;
    }

    private static PessoaPesquisaDto Map(Pessoa entidade)
    {
        if (entidade == null)
            throw new ArgumentNullException(nameof(entidade));

        PessoaPesquisaDto pessoaPesquisa = new PessoaPesquisaDto();
        pessoaPesquisa.Id = entidade.Id;
        pessoaPesquisa.Nome = entidade.Nome ?? string.Empty;
        pessoaPesquisa.Idade = entidade.Idade;

        return pessoaPesquisa;
    }

    #endregion Map
}