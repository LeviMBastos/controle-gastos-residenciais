import { TotalGeralDto } from "../total/TotalGeralDto";
import { CategoriaConsultaTotalIndividualDto } from "./CategoriaConsultaTotalIndividualDto";

export interface CategoriaConsultaTotalDto {
  categorias: CategoriaConsultaTotalIndividualDto[];
  totalGeral: TotalGeralDto;
}
