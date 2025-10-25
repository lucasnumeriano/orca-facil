import React from 'react';
import { OrcamentoProvider } from '@/contexts/OrcamentoContext';
import { OrcamentoPage } from '@/components/OrcamentoPage';

export default function BudgetByHour() {
  const camposEspecificos = [
    {
      label: 'Valor da Hora (R$)',
      field: 'valorHora',
      placeholder: '150,00',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: true,
    },
    {
      label: 'Quantidade de Horas',
      field: 'quantidadeHoras',
      placeholder: '8',
      keyboardType: 'numeric' as const,
      aplicarNormalizacao: false,
    },
  ];

  return (
    <OrcamentoProvider tipoOrcamento="por-hora">
      <OrcamentoPage title="Orçamento - Por Hora" camposEspecificos={camposEspecificos} />
    </OrcamentoProvider>
  );
}
