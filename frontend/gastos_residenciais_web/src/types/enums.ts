export const Tipo = {
  Despesa: 1,
  Receita: 2,
} as const;

export type Tipo = (typeof Tipo)[keyof typeof Tipo];

export const Finalidade = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

export type Finalidade = (typeof Finalidade)[keyof typeof Finalidade];
