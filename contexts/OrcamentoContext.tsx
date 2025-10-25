import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Material } from '@/components/MaterialInput';
import {
  FormData,
  TipoOrcamento,
  initialFormData,
  camposObrigatoriosPorTipo,
} from '@/types/orcamento.types';

interface OrcamentoContextData {
  formData: FormData;
  materials: Material[];
  tipoOrcamento: TipoOrcamento;
  updateFormData: (field: keyof FormData, value: string | boolean) => void;
  addMaterial: () => void;
  removeMaterial: (id: string) => void;
  updateMaterial: (id: string, field: keyof Material, value: string) => void;
  validateForm: () => boolean;
  generateBudget: () => void;
  resetForm: () => void;
}

const OrcamentoContext = createContext<OrcamentoContextData>({} as OrcamentoContextData);

interface OrcamentoProviderProps {
  children: React.ReactNode;
  tipoOrcamento: TipoOrcamento;
}

export const OrcamentoProvider: React.FC<OrcamentoProviderProps> = ({
  children,
  tipoOrcamento,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [materials, setMaterials] = useState<Material[]>([]);

  const updateFormData = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addMaterial = useCallback(() => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      nome: '',
      valor: '',
      quantidade: '',
    };
    setMaterials((prev) => [...prev, newMaterial]);
  }, []);

  const removeMaterial = useCallback((id: string) => {
    setMaterials((prev) => prev.filter((material) => material.id !== id));
  }, []);

  const updateMaterial = useCallback((id: string, field: keyof Material, value: string) => {
    setMaterials((prev) =>
      prev.map((material) => (material.id === id ? { ...material, [field]: value } : material))
    );
  }, []);

  const validateForm = useCallback((): boolean => {
    const camposObrigatorios = camposObrigatoriosPorTipo[tipoOrcamento];

    for (const campo of camposObrigatorios) {
      if (!formData[campo]) {
        const nomeCampo = getNomeCampo(campo);
        Alert.alert('Erro', `Por favor, preencha o campo: ${nomeCampo}`);
        return false;
      }
    }

    return true;
  }, [formData, tipoOrcamento]);

  const generateBudget = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    // Aqui você pode implementar a lógica para gerar o PDF ou enviar os dados
    Alert.alert('Sucesso', 'Orçamento gerado com sucesso!');
    console.log('Tipo de orçamento:', tipoOrcamento);
    console.log('Dados do formulário:', formData);
    console.log('Materiais:', materials);

    // Opcional: Resetar formulário após gerar
    // resetForm();
  }, [formData, materials, tipoOrcamento, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setMaterials([]);
  }, []);

  return (
    <OrcamentoContext.Provider
      value={{
        formData,
        materials,
        tipoOrcamento,
        updateFormData,
        addMaterial,
        removeMaterial,
        updateMaterial,
        validateForm,
        generateBudget,
        resetForm,
      }}>
      {children}
    </OrcamentoContext.Provider>
  );
};

export const useOrcamento = () => {
  const context = useContext(OrcamentoContext);

  if (!context) {
    throw new Error('useOrcamento must be used within an OrcamentoProvider');
  }

  return context;
};

// Helper para obter nome amigável do campo
function getNomeCampo(campo: keyof FormData): string {
  const nomes: Record<string, string> = {
    valorHora: 'Valor da Hora',
    quantidadeHoras: 'Quantidade de Horas',
    valorDiaria: 'Valor da Diária',
    quantidadeDias: 'Quantidade de Dias',
    valorMetroQuadrado: 'Valor do Metro²',
    totalMetros: 'Total de Metros²',
    emitidoPor: 'Emitido por',
    para: 'Para (Cliente)',
  };

  return nomes[campo] || campo;
}
