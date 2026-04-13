import { api } from "../api";
import { 
    TransacaoDto, 
    TransacaoPesquisaDto 
} from "../../types";

export const transacaoService = {
  listar: async (): Promise<TransacaoPesquisaDto[]> => {
    const response = await api.get<TransacaoPesquisaDto[]>("/transacao");
    return response.data;
  },

  criar: async (transacao: TransacaoDto): Promise<void> => {
    await api.post("/transacao", transacao);
  },
};
