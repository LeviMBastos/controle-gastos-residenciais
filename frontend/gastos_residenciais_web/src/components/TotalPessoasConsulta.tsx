import { useState, useEffect } from "react";
import type { PessoaConsultaTotalIndividualDto, TotalGeralDto } from "../types";
import { pessoaService } from "../services/pessoa";
import { formatarMoeda } from "../utils/formatters";
import { Tabela, type Coluna } from "./common";
import "../App.css";

interface PessoaConsultaTotalDtoResponse {
  pessoas: PessoaConsultaTotalIndividualDto[];
  totalGeral: TotalGeralDto;
}

export const TotalPessoasConsulta = () => {
  const [pessoas, setPessoas] = useState<PessoaConsultaTotalIndividualDto[]>([]);
  const [totalGeral, setTotalGeral] = useState<TotalGeralDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarTotais = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pessoaService.obterComTotais() as unknown as PessoaConsultaTotalDtoResponse;
        setPessoas(data.pessoas);
        setTotalGeral(data.totalGeral);
      } catch (err: any) {
        setError(
          err.response?.data?.mensagem || "Erro ao carregar totais de pessoas"
        );
      } finally {
        setLoading(false);
      }
    };

    carregarTotais();
  }, []);

  const colunas: Coluna<PessoaConsultaTotalIndividualDto>[] = [
    {
      cabecalho: "Pessoa",
      propriedade: "nome",
    },
    {
      cabecalho: "Receitas",
      propriedade: "totalReceitas",
      renderizar: (valor) => (
        <span className="texto-positivo">{formatarMoeda(valor)}</span>
      ),
    },
    {
      cabecalho: "Despesas",
      propriedade: "totalDespesas",
      renderizar: (valor) => (
        <span className="texto-negativo">{formatarMoeda(valor)}</span>
      ),
    },
    {
      cabecalho: "Saldo",
      propriedade: "saldo",
      renderizar: (valor) => (
        <span
          className={
            valor >= 0 ? "texto-positivo" : "texto-negativo"
          }
        >
          {formatarMoeda(valor)}
        </span>
      ),
    },
  ];

  if (loading) {
    return <div className="box">Carregando...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="box consulta-totais">
      <h2 className="section-title">Totais por Pessoa</h2>

      <div className="tabela-totais">
        <Tabela
          dados={pessoas}
          colunas={colunas}
          carregando={loading}
          mensagemVazia="Nenhuma pessoa encontrada"
        />

        {totalGeral && (
          <div className="totais-finais">
            <div className="total-linha">
              <strong>Total:</strong>
              <span className="texto-positivo">
                {formatarMoeda(totalGeral.totalReceitasGeral)}
              </span>
              <span className="texto-negativo">
                {formatarMoeda(totalGeral.totalDespesasGeral)}
              </span>
              <span
                className={
                  totalGeral.saldoLiquido >= 0
                    ? "texto-positivo"
                    : "texto-negativo"
                }
              >
                {formatarMoeda(totalGeral.saldoLiquido)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
