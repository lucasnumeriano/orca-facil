import { cn } from '@/util/cn';
import React from 'react';
import { Pressable, View, PressableProps } from 'react-native';
import T from './T';

interface ButtonProps extends PressableProps {
  title?: string;
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: string;
  bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  startIcon,
  endIcon,
  color,
  bgColor = 'bg-blue-500',
  ...rest
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-row items-center gap-5 rounded px-4 py-2', bgColor)}
      role="button"
      aria-label={title}
      disabled={rest.disabled}>
      {startIcon && <View>{startIcon}</View>}
      {title && (
        <T variant="button" color={color}>
          {title}
        </T>
      )}
      {endIcon && <View>{endIcon}</View>}
    </Pressable>
  );
};
export default Button;
