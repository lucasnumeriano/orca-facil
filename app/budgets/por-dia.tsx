import React from 'react';
import { OrcamentoProvider } from '@/contexts/OrcamentoContext';
import { OrcamentoPage } from '@/components/OrcamentoPage';

export default function BudgetByDay() {
  const camposEspecificos = [
    {
      label: 'Valor da Diária (R$)',
      field: 'valorDiaria',
      placeholder: '300,00',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: true,
    },
    {
      label: 'Quantidade de Dias',
      field: 'quantidadeDias',
      placeholder: '5',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: false,
    },
  ];

  return (
    <OrcamentoProvider tipoOrcamento="por-dia">
      <OrcamentoPage title="Orçamento - Por Dia" camposEspecificos={camposEspecificos} />
    </OrcamentoProvider>
  );
}
