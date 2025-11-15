import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Input from './Input';
import T from './T';
import Button from './Button';
import TipoMedidaSelector, { TipoMedida } from './TipoMedidaSelector';
import { normalizeDinheiro } from '@/util/normalize';

export interface Material {
  id: string;
  nome: string;
  valor: string;
  quantidade: string;
  tipoMedida: TipoMedida;
}

interface MaterialInputProps {
  materials: Material[];
  onAddMaterial: () => void;
  onRemoveMaterial: (id: string) => void;
  onUpdateMaterial: (id: string, field: keyof Material, value: string) => void;
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  materials,
  onAddMaterial,
  onRemoveMaterial,
  onUpdateMaterial,
}) => {
  return (
    <View className="w-full">
      <View className="mb-3 flex-row items-center justify-between">
        <T variant="h3" color="text-slate-700">
          Materiais
        </T>
        <Button
          title="Adicionar Material"
          onPress={onAddMaterial}
          bgColor="bg-green-500"
          color="text-white"
          startIcon={<MaterialIcons name="add" size={20} color="white" />}
        />
      </View>

      {materials.map((material) => (
        <View key={material.id} className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <View className="mb-2 flex-row items-center justify-between">
            <T variant="body" color="text-slate-600">
              Material
            </T>
            <Pressable
              onPress={() => onRemoveMaterial(material.id)}
              className="rounded-full bg-red-500 p-1">
              <MaterialIcons name="close" size={16} color="white" />
            </Pressable>
          </View>

          <View className="gap-3">
            <Input
              label="Nome do Material"
              value={material.nome}
              onChangeText={(value) => onUpdateMaterial(material.id, 'nome', value)}
              placeholder="Ex: Cabo 2,5mm"
            />

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  label="Valor (R$)"
                  value={material.valor}
                  onChangeText={(value) =>
                    onUpdateMaterial(material.id, 'valor', normalizeDinheiro(value))
                  }
                  placeholder="0,00"
                  keyboardType="numeric"
                />
              </View>

              <View className="flex-1">
                <Input
                  label={material.tipoMedida === 'metros' ? 'Metros' : 'Quantidade'}
                  value={material.quantidade}
                  onChangeText={(value) => onUpdateMaterial(material.id, 'quantidade', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View>
              <View className="mb-1">
                <T variant="caption" color="text-slate-600">
                  Tipo de Medida
                </T>
              </View>
              <TipoMedidaSelector
                value={material.tipoMedida}
                onChange={(tipo) => onUpdateMaterial(material.id, 'tipoMedida', tipo)}
              />
            </View>
          </View>
        </View>
      ))}

      {materials.length > 0 && (
        <View className="mb-4">
          <Button
            title="Adicionar Outro Material"
            onPress={onAddMaterial}
            bgColor="bg-green-500"
            color="text-white"
            startIcon={<MaterialIcons name="add" size={20} color="white" />}
          />
        </View>
      )}

      {materials.length === 0 && (
        <View className="items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8">
          <MaterialIcons name="inventory-2" size={48} color="#64748B" />
          <T variant="body" color="text-slate-500" align="text-center">
            Nenhum material adicionado
          </T>
          <T variant="caption" color="text-slate-400" align="text-center">
            Clique em &quot;Adicionar Material&quot; para começar
          </T>
        </View>
      )}
    </View>
  );
};

export default MaterialInput;
