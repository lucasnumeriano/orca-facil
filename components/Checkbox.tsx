import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { cn } from '@/util/cn';
import T from './T';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onPress: () => void;
  containerClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress, containerClassName }) => {
  return (
    <Pressable onPress={onPress} className={cn('flex-row items-center gap-2', containerClassName)}>
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded border-2',
          checked ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'
        )}>
        {checked && <MaterialIcons name="check" size={16} color="white" />}
      </View>
      {label && (
        <T variant="body" color="text-slate-700">
          {label}
        </T>
      )}
    </Pressable>
  );
};

export default Checkbox;
