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
        return transacoes.Select(Map).ToList();
    }

    public async Task Salvar(TransacaoDto transacao)
    {
        if (transacao == null)
            throw new ArgumentNullException(nameof(transacao));

        if (string.IsNullOrWhiteSpace(transacao.Descricao))
            throw new ArgumentException("Descrição é obrigatória.", nameof(transacao.Descricao));

        if (transacao.Descricao.Length > 400)
            throw new ArgumentException("Descrição deve ter no máximo 400 caracteres.", nameof(transacao.Descricao));

        if (transacao.Valor <= 0)
            throw new ArgumentException("Valor deve ser maior que zero.", nameof(transacao.Valor));

        Pessoa? pessoa = await _pessoaRepository.GetById(transacao.PessoaId);
        if (pessoa == null)
            throw new InvalidOperationException("Pessoa não encontrada.");

        if (pessoa.Idade < 18 && transacao.Tipo != Tipo.Despesa)
            throw new InvalidOperationException("Menores de idade só podem registrar despesas.");

        Categoria? categoria = await _categoriaRepository.GetById(transacao.CategoriaId);
        if (categoria == null)
            throw new InvalidOperationException("Categoria não encontrada.");

        if (categoria.Finalidade != Finalidade.Ambas && (transacao.Tipo == Tipo.Despesa && categoria.Finalidade != Finalidade.Despesa)
            || (transacao.Tipo == Tipo.Receita && categoria.Finalidade != Finalidade.Receita))
        {
            throw new InvalidOperationException("Categoria incompatível com o tipo de transação.");
        }

        await _transacaoRepository.Add(Map(transacao));
    }

    #region Map

    private static Transacao Map(TransacaoDto dto)
    {
        return new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            CategoriaId = dto.CategoriaId,
            PessoaId = dto.PessoaId
        };
    }

    private static TransacaoPesquisaDto Map(Transacao entidade)
    {
        return new TransacaoPesquisaDto
        {
            Id = entidade.Id,
            Descricao = entidade.Descricao,
            Valor = entidade.Valor,
            Tipo = entidade.Tipo,
            CategoriaId = entidade.CategoriaId,
            CategoriaDescricao = entidade.Categoria?.Descricao ?? string.Empty,
            CategoriaFinalidade = entidade.Categoria?.Finalidade ?? default,
            PessoaId = entidade.PessoaId,
            PessoaNome = entidade.Pessoa?.Nome ?? string.Empty,
            PessoaIdade = entidade.Pessoa?.Idade ?? 0
        };
    }

    #endregion Map
}