import type { CategoriaPesquisaDto } from "../../types";
import { Tabela } from "../../components/common";
import type { Coluna, AcaoTabela } from "../../components/common";
import { Finalidade } from "../../types/enums";
import "../../App.css";

interface PropsListaCategoria {
  categorias: CategoriaPesquisaDto[];
  onEdit?: (categoria: CategoriaPesquisaDto) => void;
  onDelete?: (id: number) => Promise<void>;
  carregando?: boolean;
}

const obterNomeFinalidade = (finalidade: string | number): string => {
  if (typeof finalidade === 'string') {
    return finalidade;
  }
  
  switch (finalidade) {
    case Finalidade.Receita:
      return "Receita";
    case Finalidade.Despesa:
      return "Despesa";
    case Finalidade.Ambas:
      return "Ambas";
    default:
      return "Desconhecida";
  }
};

export const CategoriaList = ({
  categorias,
  carregando = false,
}: PropsListaCategoria) => {
  const colunas: Coluna<CategoriaPesquisaDto>[] = [
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
      cabecalho: "Finalidade",
      propriedade: "finalidade",
      renderizar: (valor) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {obterNomeFinalidade(valor)}
        </span>
      ),
    },
  ];

  return (
    <Tabela
      dados={categorias}
      colunas={colunas}
      acoes={undefined}
      carregando={carregando}
      mensagemVazia="Nenhuma categoria cadastrada ainda."
      chaveLinhas="id"
    />
  );
};
