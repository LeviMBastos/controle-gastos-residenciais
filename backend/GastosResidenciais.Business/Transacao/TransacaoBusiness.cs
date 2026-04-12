using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GastosResidenciais.Model.Business;
using GastosResidenciais.Model.Data;

namespace GastosResidenciais.Business;

public class TransacaoBusiness : ITransacaoBusiness
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    private const int IdadeMenorIdade = 18;

    public TransacaoBusiness(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
    }

    public async Task<IList<TransacaoPesquisaDto>> Pesquisar()
    {
        IList<Transacao> transacoes = await _transacaoRepository.GetAll();

        if (transacoes == null)
            return new List<TransacaoPesquisaDto>();

        return transacoes.Select(Map).ToList();
    }

    public async Task Salvar(TransacaoDto transacao)
    {
        if (transacao == null)
            throw new ArgumentNullException(nameof(transacao), "Transação não pode ser nula.");

        ValidarTransacaoDto(transacao);

        Pessoa? pessoa = await _pessoaRepository.GetById(transacao.PessoaId);
        if (pessoa == null)
            throw new InvalidOperationException($"Pessoa com ID {transacao.PessoaId} não encontrada.");

        ValidarIdadePessoa(pessoa, transacao.Tipo);

        Categoria? categoria = await _categoriaRepository.GetById(transacao.CategoriaId);
        if (categoria == null)
            throw new InvalidOperationException($"Categoria com ID {transacao.CategoriaId} não encontrada.");

        ValidarCategoriaCompativel(categoria, transacao.Tipo);

        await _transacaoRepository.Add(Map(transacao));
    }

    private static void ValidarTransacaoDto(TransacaoDto transacao)
    {
        if (string.IsNullOrWhiteSpace(transacao.Descricao))
            throw new ArgumentException("Descrição é obrigatória.", nameof(transacao.Descricao));

        if (transacao.Descricao.Length > 400)
            throw new ArgumentException("Descrição deve ter no máximo 400 caracteres.", nameof(transacao.Descricao));

        if (transacao.Valor <= 0)
            throw new ArgumentException("Valor deve ser maior que zero.", nameof(transacao.Valor));

        if (!Enum.IsDefined(typeof(Tipo), transacao.Tipo))
            throw new ArgumentException("Tipo de transação inválido.", nameof(transacao.Tipo));

        if (transacao.CategoriaId <= 0)
            throw new ArgumentException("ID de categoria deve ser maior que zero.", nameof(transacao.CategoriaId));

        if (transacao.PessoaId <= 0)
            throw new ArgumentException("ID de pessoa deve ser maior que zero.", nameof(transacao.PessoaId));
    }

    private static void ValidarIdadePessoa(Pessoa pessoa, Tipo tipo)
    {
        if (pessoa == null)
            throw new ArgumentNullException(nameof(pessoa));

        if (pessoa.Idade < IdadeMenorIdade && tipo != Tipo.Despesa)
            throw new InvalidOperationException("Menores de idade só podem registrar despesas.");
    }

    private static void ValidarCategoriaCompativel(Categoria categoria, Tipo tipo)
    {
        if (categoria == null)
            throw new ArgumentNullException(nameof(categoria));

        bool naoCompativel = (tipo == Tipo.Despesa && categoria.Finalidade != Finalidade.Despesa && categoria.Finalidade != Finalidade.Ambas)
                          || (tipo == Tipo.Receita && categoria.Finalidade != Finalidade.Receita && categoria.Finalidade != Finalidade.Ambas);

        if (naoCompativel)
            throw new InvalidOperationException($"Categoria com finalidade '{categoria.Finalidade}' é incompatível com transação do tipo '{tipo}'.");
    }

    #region Map

    private static Transacao Map(TransacaoDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        Transacao transacao = new Transacao();
        transacao.Descricao = dto.Descricao ?? string.Empty;
        transacao.Valor = dto.Valor;
        transacao.Tipo = dto.Tipo;
        transacao.CategoriaId = dto.CategoriaId;
        transacao.PessoaId = dto.PessoaId;
        
        return transacao;
    }

    private static TransacaoPesquisaDto Map(Transacao entidade)
    {
        if (entidade == null)
            throw new ArgumentNullException(nameof(entidade));

        TransacaoPesquisaDto transacaoPesquisa = new TransacaoPesquisaDto();
        transacaoPesquisa.Id = entidade.Id;
        transacaoPesquisa.Descricao = entidade.Descricao ?? string.Empty;
        transacaoPesquisa.Valor = entidade.Valor;
        transacaoPesquisa.Tipo = entidade.Tipo;
        transacaoPesquisa.CategoriaId = entidade.CategoriaId;
        transacaoPesquisa.CategoriaDescricao = entidade.Categoria?.Descricao ?? string.Empty;
        transacaoPesquisa.CategoriaFinalidade = entidade.Categoria?.Finalidade ?? default;
        transacaoPesquisa.PessoaId = entidade.PessoaId;
        transacaoPesquisa.PessoaNome = entidade.Pessoa?.Nome ?? string.Empty;
        transacaoPesquisa.PessoaIdade = entidade.Pessoa?.Idade ?? 0;

        return transacaoPesquisa;
    }

    #endregion Map
}