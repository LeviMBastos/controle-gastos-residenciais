import { useState, useEffect } from "react";
import type { PessoaDto } from "../../types";

interface UseFormPessoaReturn {
  formData: PessoaDto;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (pessoa: PessoaDto) => Promise<void>
  ) => Promise<void>;
  resetForm: () => void;
}

export const useFormPessoa = (initialData?: PessoaDto): UseFormPessoaReturn => {
  const [formData, setFormData] = useState<PessoaDto>(
    initialData || {
      nome: "",
      idade: 0,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idade" ? (parseInt(value) || 0) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome || formData.nome.trim().length === 0) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.length > 200) {
      newErrors.nome = "Nome deve ter no máximo 200 caracteres";
    }

    if (formData.idade < 0 || formData.idade > 150) {
      newErrors.idade = "Idade deve estar entre 0 e 150";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (pessoa: PessoaDto) => Promise<void>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      setErrors({ submit: "Erro ao salvar pessoa" });
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", idade: 0 });
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
