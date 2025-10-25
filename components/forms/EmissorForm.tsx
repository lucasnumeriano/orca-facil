import React from 'react';
import { View } from 'react-native';
import Input from '../Input';
import T from '../T';
import { normalizeCPFCNPJ, normalizeTelefone } from '@/util/normalize';

interface EmissorFormProps {
  emitidoPor: string;
  cpfCnpj: string;
  endereco: string;
  telefone: string;
  onUpdate: (field: any, value: string) => void;
}

const EmissorForm: React.FC<EmissorFormProps> = ({
  emitidoPor,
  cpfCnpj,
  endereco,
  telefone,
  onUpdate,
}) => {
  return (
    <View className="rounded-lg bg-white p-4">
      <View className="mb-4">
        <T variant="h3" color="text-slate-700">
          Dados do Emissor
        </T>
      </View>

      <View className="gap-3">
        <Input
          label="Emitido por"
          value={emitidoPor}
          onChangeText={(value) => onUpdate('emitidoPor', value)}
          placeholder="Nome da empresa/profissional"
        />

        <Input
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChangeText={(value) => onUpdate('cpfCnpjEmissor', normalizeCPFCNPJ(value))}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          maxLength={18}
        />

        <Input
          label="Endereço"
          value={endereco}
          onChangeText={(value) => onUpdate('enderecoEmissor', value)}
          placeholder="Rua, número, bairro"
          multiline
        />

        <Input
          label="Telefone"
          value={telefone}
          onChangeText={(value) => onUpdate('telefoneEmissor', normalizeTelefone(value))}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          maxLength={15}
        />
      </View>
    </View>
  );
};

export default EmissorForm;
