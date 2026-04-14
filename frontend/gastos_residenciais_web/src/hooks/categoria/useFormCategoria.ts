import { useState, useEffect } from "react";
import type { CategoriaDto } from "../../types";
import { Finalidade } from "../../types/enums";

interface UseFormCategoriaReturn {
  formData: CategoriaDto;
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validateForm: () => boolean;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (categoria: CategoriaDto) => Promise<void>
  ) => Promise<void>;
  resetForm: () => void;
}

const normalizarFinalidade = (
  finalidade: string | number
): Finalidade => {
  if (typeof finalidade === "number") {
    return finalidade as Finalidade;
  }

  switch (finalidade.toLowerCase()) {
    case "receita":
      return Finalidade.Receita;
    case "despesa":
      return Finalidade.Despesa;
    case "ambas":
      return Finalidade.Ambas;
    default:
      return Finalidade.Ambas;
  }
};

export const useFormCategoria = (
  initialData?: CategoriaDto
): UseFormCategoriaReturn => {
  const [formData, setFormData] = useState<CategoriaDto>(
    initialData
      ? {
          descricao: initialData.descricao,
          finalidade: normalizarFinalidade(initialData.finalidade),
        }
      : {
          descricao: "",
          finalidade: Finalidade.Ambas,
        }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        descricao: initialData.descricao,
        finalidade: normalizarFinalidade(initialData.finalidade),
      });
      setErrors({});
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "finalidade" ? (parseInt(value) as Finalidade) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.descricao || formData.descricao.trim().length === 0) {
      newErrors.descricao = "Descrição é obrigatória";
    } else if (formData.descricao.length > 400) {
      newErrors.descricao = "Descrição deve ter no máximo 400 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (categoria: CategoriaDto) => Promise<void>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      setErrors({ submit: "Erro ao salvar categoria" });
    }
  };

  const resetForm = () => {
    setFormData({
      descricao: "",
      finalidade: Finalidade.Ambas,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    handleSubmit,
    resetForm,
  };
};
