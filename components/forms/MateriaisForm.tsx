import React from 'react';
import { View } from 'react-native';
import MaterialInput, { Material } from '../MaterialInput';

interface MateriaisFormProps {
  materials: Material[];
  onAddMaterial: () => void;
  onRemoveMaterial: (id: string) => void;
  onUpdateMaterial: (id: string, field: keyof Material, value: string) => void;
}

const MateriaisForm: React.FC<MateriaisFormProps> = ({
  materials,
  onAddMaterial,
  onRemoveMaterial,
  onUpdateMaterial,
}) => {
  return (
    <View className="rounded-lg bg-white p-4">
      <MaterialInput
        materials={materials}
        onAddMaterial={onAddMaterial}
        onRemoveMaterial={onRemoveMaterial}
        onUpdateMaterial={onUpdateMaterial}
      />
    </View>
  );
};

export default MateriaisForm;
