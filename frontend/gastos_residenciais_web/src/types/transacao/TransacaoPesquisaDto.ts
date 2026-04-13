import { TransacaoDto } from "./TransacaoDto";
import { CategoriaPesquisaDto } from "../categoria/CategoriaPesquisaDto";
import { PessoaPesquisaDto } from "../pessoa/PessoaPesquisaDto";

export interface TransacaoPesquisaDto extends TransacaoDto {
  id: number;
  categoria?: CategoriaPesquisaDto;
  pessoa?: PessoaPesquisaDto;
}
