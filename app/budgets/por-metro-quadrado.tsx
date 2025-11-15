import React from 'react';
import { OrcamentoProvider } from '@/contexts/OrcamentoContext';
import { OrcamentoPage } from '@/components/OrcamentoPage';

export default function BudgetBySquareMeter() {
  const camposEspecificos = [
    {
      label: 'Valor do Metro² (R$)',
      field: 'valorMetroQuadrado',
      placeholder: '50,00',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: true,
    },
    {
      label: 'Total de Metros² a serem trabalhados',
      field: 'totalMetros',
      placeholder: '100',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: false,
    },
  ];

  return (
    <OrcamentoProvider tipoOrcamento="por-metro-quadrado">
      <OrcamentoPage title="Criar Orçamento - Por Metro²" camposEspecificos={camposEspecificos} />
    </OrcamentoProvider>
  );
}
