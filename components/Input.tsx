import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import { cn } from '@/util/cn';
import T from './T';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, error, containerClassName, className, ...props }) => {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label && (
        <View className="mb-1">
          <T variant="body" color="text-slate-700">
            {label}
          </T>
        </View>
      )}
      <TextInput
        className={cn(
          'rounded border border-slate-300 bg-white px-3 py-2 text-base',
          error && 'border-red-500',
          className
        )}
        placeholderTextColor="#9CA3AF"
        value={props.value || ''}
        {...props}
      />
      {error && (
        <View className="mt-1">
          <T variant="caption" color="text-red-500">
            {error}
          </T>
        </View>
      )}
    </View>
  );
};

export default Input;
