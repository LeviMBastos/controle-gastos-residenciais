import type { TransacaoPesquisaDto } from "../../types";
import { Tabela } from "../../components/common";
import type { Coluna } from "../../components/common";
import { Tipo } from "../../types/enums";
import "../../App.css";

interface PropsListaTransacao {
  transacoes: TransacaoPesquisaDto[];
  carregando?: boolean;
}

const obterNomeTipo = (tipo: number | string): string => {
  if (typeof tipo === "string") {
    return tipo === "Receita" || tipo === "Despesa" ? tipo : "Desconhecido";
  }
  switch (tipo) {
    case Tipo.Receita:
      return "Receita";
    case Tipo.Despesa:
      return "Despesa";
    default:
      return "Desconhecido";
  }
};

const formatarValor = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

export const TransacaoList = ({
  transacoes,
  carregando = false,
}: PropsListaTransacao) => {
  const colunas: Coluna<TransacaoPesquisaDto>[] = [
    {
      cabecalho: "ID",
      propriedade: "id",
    },
    {
      cabecalho: "Descrição",
      propriedade: "descricao",
      renderizar: (valor) => <span className="font-medium">{valor}</span>,
    },
    {
      cabecalho: "Valor",
      propriedade: "valor",
      renderizar: (valor) => (
        <span className="font-semibold text-green-600">{formatarValor(valor)}</span>
      ),
    },
    {
      cabecalho: "Tipo",
      propriedade: "tipo",
      renderizar: (valor) => {
        const isReceita = valor === Tipo.Receita || valor === "Receita";
        return (
          <span
            className={`px-2 py-1 rounded ${
              isReceita
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {obterNomeTipo(valor)}
          </span>
        );
      },
    },
    {
      cabecalho: "Categoria",
      propriedade: "categoriaDescricao",
      renderizar: (valor) => (
        <span>{valor || "N/A"}</span>
      ),
    },
    {
      cabecalho: "Pessoa",
      propriedade: "pessoaNome",
      renderizar: (valor) => (
        <span>{valor || "N/A"}</span>
      ),
    },
  ];

  return (
    <Tabela
      dados={transacoes}
      colunas={colunas}
      acoes={undefined}
      carregando={carregando}
      mensagemVazia="Nenhuma transação registrada ainda."
      chaveLinhas="id"
    />
  );
};
