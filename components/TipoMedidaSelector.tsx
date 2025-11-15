import React from 'react';
import { View, Pressable } from 'react-native';
import T from './T';

export type TipoMedida = 'unidades' | 'metros';

interface TipoMedidaSelectorProps {
  value: TipoMedida;
  onChange: (tipo: TipoMedida) => void;
}

const TipoMedidaSelector: React.FC<TipoMedidaSelectorProps> = ({ value, onChange }) => {
  return (
    <View className="flex-row gap-2">
      <Pressable
        onPress={() => onChange('unidades')}
        className={`flex-1 rounded-lg border-2 px-3 py-2 ${
          value === 'unidades' ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white'
        }`}>
        <T
          variant="caption"
          color={value === 'unidades' ? 'text-blue-600' : 'text-slate-600'}
          align="text-center">
          Unidades
        </T>
      </Pressable>

      <Pressable
        onPress={() => onChange('metros')}
        className={`flex-1 rounded-lg border-2 px-3 py-2 ${
          value === 'metros' ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white'
        }`}>
        <T
          variant="caption"
          color={value === 'metros' ? 'text-blue-600' : 'text-slate-600'}
          align="text-center">
          Metros
        </T>
      </Pressable>
    </View>
  );
};

export default TipoMedidaSelector;
