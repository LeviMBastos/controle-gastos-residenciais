export const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const processarValorDinheiro = (input: string): number => {
  const limpo = input.replace(/\D/g, "");
  if (!limpo) return 0;
  
  return parseInt(limpo) / 100;
};
