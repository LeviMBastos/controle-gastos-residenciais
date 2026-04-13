import { api } from "../api";
import type {
  PessoaDto,
  PessoaPesquisaDto,
  PessoaConsultaTotalDto,
} from "../../types";

export const pessoaService = {
  listar: async (): Promise<PessoaPesquisaDto[]> => {
    const response = await api.get<PessoaPesquisaDto[]>("/pessoa");
    return response.data;
  },

  obterPorId: async (id: number): Promise<PessoaPesquisaDto> => {
    const response = await api.get<PessoaPesquisaDto>(`/pessoa/${id}`);
    return response.data;
  },

  criar: async (pessoa: PessoaDto): Promise<void> => {
    await api.post("/pessoa", pessoa);
  },

  atualizar: async (id: number, pessoa: PessoaDto): Promise<void> => {
    await api.put(`/pessoa/${id}`, pessoa);
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/pessoa/${id}`);
  },

  obterComTotais: async (): Promise<PessoaConsultaTotalDto> => {
    const response = await api.get<PessoaConsultaTotalDto>(
      "/pessoa/TotaisTransacoes"
    );
    return response.data;
  },
};
