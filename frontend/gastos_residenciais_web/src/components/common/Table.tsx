import React from "react";
import "../../App.css";

export interface Coluna<T> {
  cabecalho: string;
  propriedade: keyof T | string;
  renderizar?: (valor: any, linha: T, indice: number) => React.ReactNode;
  largura?: string;
}

export interface AcaoTabela<T> {
  rotulo: string;
  aoClicar: (linha: T) => void | Promise<void>;
  variante?: "primario" | "perigo" | "aviso" | "sucesso";
  desabilitada?: (linha: T) => boolean;
}

interface PropsTabela<T extends Record<string, any>> {
  dados: T[];
  colunas: Coluna<T>[];
  acoes?: AcaoTabela<T>[];
  carregando?: boolean;
  mensagemVazia?: string;
  chaveLinhas?: keyof T;
}

const obterValor = (obj: any, caminho: string | any): any => {
  const caminhoTexto = String(caminho);
  if (caminhoTexto.includes(".")) {
    return caminhoTexto.split(".").reduce((atual, prop) => atual?.[prop], obj);
  }
  return obj[caminhoTexto];
};

export const Tabela = <T extends Record<string, any>>({
  dados,
  colunas,
  acoes,
  carregando = false,
  mensagemVazia = "Nenhum registro encontrado",
  chaveLinhas = "id" as keyof T,
}: PropsTabela<T>) => {
  if (dados.length === 0) {
    return <div className="empty-state">{mensagemVazia}</div>;
  }

  const getButtonClass = (variante?: string) => {
    switch (variante) {
      case "perigo":
        return "button-sm button-danger";
      case "aviso":
        return "button-sm button-warning";
      case "sucesso":
        return "button-sm button-success";
      default:
        return "button-sm button-primary";
    }
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {colunas.map((coluna) => (
                <th key={String(coluna.propriedade)}>
                  {coluna.cabecalho}
                </th>
              ))}
              {acoes && acoes.length > 0 && <th>Ações</th>}
            </tr>
          </thead>

          <tbody>
            {dados.map((linha, indice) => (
              <tr key={String(obterValor(linha, chaveLinhas))}>
                {colunas.map((coluna) => {
                  const valor = obterValor(linha, coluna.propriedade);
                  const conteudo = coluna.renderizar
                    ? coluna.renderizar(valor, linha, indice)
                    : valor;

                  return <td key={String(coluna.propriedade)}>{conteudo}</td>;
                })}

                {acoes && acoes.length > 0 && (
                  <td>
                    {acoes.map((acao, i) => {
                      const desabilitado =
                        acao.desabilitada?.(linha) || carregando;

                      return (
                        <button
                          key={i}
                          onClick={() =>
                            !desabilitado && acao.aoClicar(linha)
                          }
                          disabled={desabilitado}
                          className={getButtonClass(acao.variante)}
                        >
                          {acao.rotulo}
                        </button>
                      );
                    })}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

