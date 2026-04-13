import type { PessoaPesquisaDto } from "../../types";
import { Tabela } from "../../components/common";
import type { Coluna, AcaoTabela } from "../../components/common";
import "../../App.css";

interface PropsListaPessoa {
  pessoas: PessoaPesquisaDto[];
  onEdit?: (pessoa: PessoaPesquisaDto) => void;
  onDelete?: (id: number) => Promise<void>;
  carregando?: boolean;
}

export const PessoaList = ({
  pessoas,
  onEdit,
  onDelete,
  carregando = false,
}: PropsListaPessoa) => {
  const colunas: Coluna<PessoaPesquisaDto>[] = [
    {
      cabecalho: "ID",
      propriedade: "id",
    },
    {
      cabecalho: "Nome",
      propriedade: "nome",
      renderizar: (valor) => <span className="font-medium">{valor}</span>,
    },
    {
      cabecalho: "Idade",
      propriedade: "idade",
      renderizar: (valor) => <span>{valor} anos</span>,
    },
  ];

  const acoes: AcaoTabela<PessoaPesquisaDto>[] = [];

  if (onEdit) {
    acoes.push({
      rotulo: "Editar",
      aoClicar: (pessoa) => onEdit(pessoa),
      variante: "primario",
    });
  }

  if (onDelete) {
    acoes.push({
      rotulo: "Deletar",
      aoClicar: async (pessoa) => {
        if (window.confirm("Tem certeza que deseja deletar esta pessoa?")) {
          try {
            await onDelete(pessoa.id);
          } catch (erro) {
            alert("Erro ao deletar pessoa");
          }
        }
      },
      variante: "perigo",
    });
  }

  return (
    <Tabela
      dados={pessoas}
      colunas={colunas}
      acoes={acoes}
      carregando={carregando}
      mensagemVazia="Nenhuma pessoa cadastrada ainda."
      chaveLinhas="id"
    />
  );
};
