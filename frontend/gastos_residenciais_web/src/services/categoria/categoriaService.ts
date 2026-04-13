import { api } from "../api";
import {
  CategoriaDto,
  CategoriaPesquisaDto,
  CategoriaConsultaTotalDto,
} from "../../types";

export const categoriaService = {
  listar: async (): Promise<CategoriaPesquisaDto[]> => {
    const response = await api.get<CategoriaPesquisaDto[]>("/categoria");
    return response.data;
  },

  criar: async (categoria: CategoriaDto): Promise<void> => {
    await api.post("/categoria", categoria);
  },

  obterComTotais: async (): Promise<CategoriaConsultaTotalDto> => {
    const response = await api.get<CategoriaConsultaTotalDto>(
      "/categoria/TotaisPorCategoria"
    );
    return response.data;
  },
};
