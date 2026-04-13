import { api } from "../api";
import type {
  CategoriaDto,
  CategoriaPesquisaDto,
  CategoriaConsultaTotalDto,
} from "../../types";

export const categoriaService = {
  listar: async (): Promise<CategoriaPesquisaDto[]> => {
    const response = await api.get<CategoriaPesquisaDto[]>("/categoria");
    return response.data;
  },

  obterPorId: async (id: number): Promise<CategoriaPesquisaDto> => {
    const response = await api.get<CategoriaPesquisaDto>(`/categoria/${id}`);
    return response.data;
  },

  criar: async (categoria: CategoriaDto): Promise<void> => {
    await api.post("/categoria", categoria);
  },

  atualizar: async (id: number, categoria: CategoriaDto): Promise<void> => {
    await api.put(`/categoria/${id}`, categoria);
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/categoria/${id}`);
  },

  obterComTotais: async (): Promise<CategoriaConsultaTotalDto> => {
    const response = await api.get<CategoriaConsultaTotalDto>(
      "/categoria/TotaisPorCategoria"
    );
    return response.data;
  },
};
