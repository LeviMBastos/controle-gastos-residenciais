import { Tipo } from "../enums";

export interface TransacaoDto {
  descricao: string;
  valor: number;
  tipo: Tipo;
  categoriaId: number;
  pessoaId: number;
}
