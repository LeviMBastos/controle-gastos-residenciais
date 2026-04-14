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

    public async Task<PessoaConsultaTotalDto> PesquisarComTotais()
    {
        IList<Pessoa> pessoas = await _pessoaRepository.GetAllComTransacoes();

        if (pessoas == null || pessoas.Count == 0)
            return new PessoaConsultaTotalDto();

        PessoaConsultaTotalDto retorno = new PessoaConsultaTotalDto
        {
            Pessoas = new List<PessoaConsultaTotalIndividualDto>(),
            TotalGeral = new TotalGeralDto()
        };

        foreach (Pessoa pessoa in pessoas)
        {
            decimal totalReceitas = pessoa.Transacoes?
                                          .Where(tran => tran.Tipo == Tipo.Receita)
                                          .Sum(tran => tran.Valor) ?? 0;

            decimal totalDespesas = pessoa.Transacoes?
                                          .Where(tran => tran.Tipo == Tipo.Despesa)
                                          .Sum(tran => tran.Valor) ?? 0;

            decimal saldo = totalReceitas - totalDespesas;

            retorno.Pessoas.Add(Map(pessoa.Nome, totalReceitas, totalDespesas, saldo));

            retorno.TotalGeral.TotalReceitasGeral += totalReceitas;
            retorno.TotalGeral.TotalDespesasGeral += totalDespesas;
        }

        retorno.TotalGeral.SaldoLiquido = retorno.TotalGeral.TotalReceitasGeral - retorno.TotalGeral.TotalDespesasGeral;

        return retorno;
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

        pessoaExistente.Nome = pessoa.Nome ?? string.Empty;
        pessoaExistente.Idade = pessoa.Idade;

        await _pessoaRepository.Update(pessoaExistente);
    }

    public async Task Deletar(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID deve ser maior que zero.", nameof(id));

        Pessoa? pessoa = await _pessoaRepository.GetByIdComTransacoes(id);

        if (pessoa == null)
            throw new InvalidOperationException($"Pessoa com ID {id} não encontrada.");

        if (pessoa.Transacoes != null && pessoa.Transacoes.Count > 0)
            throw new InvalidOperationException($"Não é possível deletar a pessoa '{pessoa.Nome}' pois existem {pessoa.Transacoes.Count} transação(ões) em seu nome.");

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

    private static PessoaConsultaTotalIndividualDto Map(string nome, decimal totalReceitas, decimal totalDespesas, decimal saldo)
    {
        PessoaConsultaTotalIndividualDto pessoaConsulta = new PessoaConsultaTotalIndividualDto();
        pessoaConsulta.Nome = nome ?? string.Empty;
        pessoaConsulta.TotalReceitas = totalReceitas;
        pessoaConsulta.TotalDespesas = totalDespesas;
        pessoaConsulta.Saldo = saldo;

        return pessoaConsulta;
    }

    #endregion Map
}