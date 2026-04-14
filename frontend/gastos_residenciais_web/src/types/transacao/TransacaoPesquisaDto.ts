import type { TransacaoDto } from "./TransacaoDto";

export interface TransacaoPesquisaDto extends TransacaoDto {
  id: number;
  categoriaDescricao?: string;
  categoriaFinalidade?: string;
  pessoaNome?: string;
  pessoaIdade?: number;
}
