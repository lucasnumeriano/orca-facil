import React from 'react';
import { View } from 'react-native';
import Input from '../Input';
import T from '../T';

interface OrcamentoFormProps {
  tituloOrcamento: string;
  servico: string;
  prazoEntrega: string;
  validade: string;
  data: string;
  onUpdate: (field: any, value: string | boolean) => void;
}

const OrcamentoForm: React.FC<OrcamentoFormProps> = ({
  tituloOrcamento,
  servico,
  prazoEntrega,
  validade,
  data,
  onUpdate,
}) => {
  return (
    <View className="rounded-lg bg-white p-4">
      <View className="mb-4">
        <T variant="h3" color="text-slate-700">
          Dados do Orçamento
        </T>
      </View>

      <View className="gap-3">
        <Input
          label="Título do Orçamento"
          value={tituloOrcamento}
          onChangeText={(value) => onUpdate('tituloOrcamento', value)}
          placeholder="Ex: Orçamento de Instalação Elétrica"
        />

        <Input
          label="Serviço"
          value={servico}
          onChangeText={(value) => onUpdate('servico', value)}
          placeholder="Descrição do serviço"
          multiline
        />

        <Input
          label="Prazo de Entrega"
          value={prazoEntrega}
          onChangeText={(value) => onUpdate('prazoEntrega', value)}
          placeholder="Ex: 5 dias úteis"
        />

        <Input
          label="Validade"
          value={validade}
          onChangeText={(value) => onUpdate('validade', value)}
          placeholder="Ex: 30 dias"
        />

        <Input
          label="Data"
          value={data}
          onChangeText={(value) => onUpdate('data', value)}
          placeholder="DD/MM/AAAA"
        />
      </View>
    </View>
  );
};

export default OrcamentoForm;
