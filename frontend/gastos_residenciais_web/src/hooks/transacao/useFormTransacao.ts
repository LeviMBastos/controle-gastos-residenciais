import { useState, useEffect } from "react";
import type { TransacaoDto, PessoaPesquisaDto, CategoriaPesquisaDto } from "../../types";
import { Tipo } from "../../types/enums";
import { pessoaService } from "../../services/pessoa";
import { categoriaService } from "../../services/categoria";
import { formatarMoeda, processarValorDinheiro } from "../../utils/formatters";

interface UseFormTransacaoReturn {
  formData: TransacaoDto;
  valorDisplay: string;
  errors: Record<string, string>;
  pessoas: PessoaPesquisaDto[];
  categorias: CategoriaPesquisaDto[];
  loadingData: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleBlurValor: () => void;
  validateForm: () => boolean;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (transacao: TransacaoDto) => Promise<void>
  ) => Promise<void>;
  resetForm: () => void;
}

export const useFormTransacao = (
  initialData?: TransacaoDto
): UseFormTransacaoReturn => {
  const [formData, setFormData] = useState<TransacaoDto>(
    initialData || {
      descricao: "",
      valor: 0,
      tipo: Tipo.Despesa,
      categoriaId: 0,
      pessoaId: 0,
    }
  );
  const [valorDisplay, setValorDisplay] = useState<string>(
    initialData ? formatarMoeda(initialData.valor) : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pessoas, setPessoas] = useState<PessoaPesquisaDto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaPesquisaDto[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Carrega pessoas e categorias na montagem
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [pessoasData, categoriasData] = await Promise.all([
          pessoaService.listar(),
          categoriaService.listar(),
        ]);
        setPessoas(pessoasData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao carregar pessoas e categorias", error);
      } finally {
        setLoadingData(false);
      }
    };

    carregarDados();
  }, []);

  // Atualiza formData quando initialData muda
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setValorDisplay(formatarMoeda(initialData.valor));
      setErrors({});
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "valor") {
      const valorNumerico = processarValorDinheiro(value);
      setFormData((prev) => ({
        ...prev,
        valor: valorNumerico,
      }));
      setValorDisplay(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "tipo" || name === "categoriaId" || name === "pessoaId"
            ? parseInt(value) || 0
            : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlurValor = () => {
    if (formData.valor > 0) {
      setValorDisplay(formatarMoeda(formData.valor));
    } else {
      setValorDisplay("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.descricao || formData.descricao.trim().length === 0) {
      newErrors.descricao = "Descrição é obrigatória";
    } else if (formData.descricao.length > 400) {
      newErrors.descricao = "Descrição deve ter no máximo 400 caracteres";
    }

    if (formData.valor <= 0) {
      newErrors.valor = "Valor deve ser maior que zero";
    }

    if (
      !formData.tipo ||
      (formData.tipo !== Tipo.Despesa && formData.tipo !== Tipo.Receita)
    ) {
      newErrors.tipo = "Tipo é obrigatório";
    }

    if (!formData.categoriaId || formData.categoriaId === 0) {
      newErrors.categoriaId = "Categoria é obrigatória";
    }

    if (!formData.pessoaId || formData.pessoaId === 0) {
      newErrors.pessoaId = "Pessoa é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (transacao: TransacaoDto) => Promise<void>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      setErrors({ submit: "Erro ao salvar transação" });
    }
  };

  const resetForm = () => {
    setFormData({
      descricao: "",
      valor: 0,
      tipo: Tipo.Despesa,
      categoriaId: 0,
      pessoaId: 0,
    });
    setValorDisplay("");
    setErrors({});
  };

  return {
    formData,
    valorDisplay,
    errors,
    pessoas,
    categorias,
    loadingData,
    handleChange,
    handleBlurValor,
    validateForm,
    handleSubmit,
    resetForm,
  };
};
