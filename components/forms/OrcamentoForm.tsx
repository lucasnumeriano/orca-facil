import React from 'react';
import { View } from 'react-native';
import Input from '../Input';
import Checkbox from '../Checkbox';
import T from '../T';

interface OrcamentoFormProps {
  servico: string;
  prazoEntrega: string;
  validade: string;
  data: string;
  enviarEmail: boolean;
  onUpdate: (field: any, value: string | boolean) => void;
}

const OrcamentoForm: React.FC<OrcamentoFormProps> = ({
  servico,
  prazoEntrega,
  validade,
  data,
  enviarEmail,
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

        <Checkbox
          label="Enviar cópia para email do cliente"
          checked={enviarEmail}
          onPress={() => onUpdate('enviarEmail', !enviarEmail)}
          containerClassName="mt-2"
        />
      </View>
    </View>
  );
};

export default OrcamentoForm;
