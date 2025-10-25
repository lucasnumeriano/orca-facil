import React from 'react';
import { View } from 'react-native';
import Input from '../Input';
import T from '../T';
import { normalizeCPFCNPJ, normalizeTelefone } from '@/util/normalize';

interface ClienteFormProps {
  para: string;
  cpfCnpj: string;
  endereco: string;
  telefone: string;
  cidade: string;
  estado: string;
  onUpdate: (field: any, value: string) => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  para,
  cpfCnpj,
  endereco,
  telefone,
  cidade,
  estado,
  onUpdate,
}) => {
  return (
    <View className="rounded-lg bg-white p-4">
      <View className="mb-4">
        <T variant="h3" color="text-slate-700">
          Dados do Cliente
        </T>
      </View>

      <View className="gap-3">
        <Input
          label="Para"
          value={para}
          onChangeText={(value) => onUpdate('para', value)}
          placeholder="Nome do cliente"
        />

        <Input
          label="CPF/CNPJ"
          value={cpfCnpj}
          onChangeText={(value) => onUpdate('cpfCnpjCliente', normalizeCPFCNPJ(value))}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          maxLength={18}
        />

        <Input
          label="Endereço"
          value={endereco}
          onChangeText={(value) => onUpdate('enderecoCliente', value)}
          placeholder="Rua, número, bairro"
          multiline
        />

        <Input
          label="Telefone"
          value={telefone}
          onChangeText={(value) => onUpdate('telefoneCliente', normalizeTelefone(value))}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          maxLength={15}
        />

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              label="Cidade"
              value={cidade}
              onChangeText={(value) => onUpdate('cidade', value)}
              placeholder="São Paulo"
            />
          </View>

          <View className="w-20">
            <Input
              label="Estado"
              value={estado}
              onChangeText={(value) => onUpdate('estado', value)}
              placeholder="SP"
              maxLength={2}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClienteForm;
