import type { Tipo } from "../enums";

export interface TransacaoDto {
  descricao: string;
  valor: number;
  tipo: Tipo | string;
  categoriaId: number;
  pessoaId: number;
}
