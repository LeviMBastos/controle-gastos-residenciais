import { Finalidade } from "../enums";

export interface CategoriaConsultaTotalIndividualDto {
  id: number;
  descricao: string;
  finalidade: Finalidade;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}
