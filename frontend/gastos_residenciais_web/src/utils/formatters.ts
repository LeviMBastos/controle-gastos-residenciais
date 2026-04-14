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

export const tratarErroApi = (erro: any): string => {
  if (erro.response?.data?.mensagem) {
    return erro.response.data.mensagem;
  }
  if (erro.response?.data?.erro) {
    return erro.response.data.erro;
  }
  if (erro.message) {
    return erro.message;
  }
  return "Ocorreu um erro. Tente novamente.";
};
