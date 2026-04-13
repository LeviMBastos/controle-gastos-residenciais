import { TotalGeralDto } from "../total/TotalGeralDto";
import { PessoaConsultaTotalIndividualDto } from "./PessoaConsultaTotalIndividualDto";

export interface PessoaConsultaTotalDto {
  pessoas: PessoaConsultaTotalIndividualDto[];
  totalGeral: TotalGeralDto;
}
