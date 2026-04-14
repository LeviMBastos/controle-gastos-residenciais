import { api } from "../api";
import type { 
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

  atualizar: async (id: number, transacao: TransacaoDto): Promise<void> => {
    await api.put(`/transacao/${id}`, transacao);
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/transacao/${id}`);
  },
};
