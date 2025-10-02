import { cn } from '@/util/cn';
import { clsx } from 'clsx';
import { Text } from 'react-native';

interface TProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
  children: React.ReactNode;
  color?: string;
  align?: 'text-left' | 'text-center' | 'text-right';
}

const T: React.FC<TProps> = ({ children, variant, color = 'text-black', align = 'text-left' }) => {
  const textSize = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    body: 'text-base font-regular',
    caption: 'text-sm font-regular',
    button: 'text-lg font-semibold',
  };

  const className = clsx(textSize[variant], color, align);

  return <Text className={cn(className)}>{children}</Text>;
};

export default T;
