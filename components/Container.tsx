import { View } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classNameContainer = ['flex-1', 'px-4', 'pt-20', 'pb-6'];
  if (className) {
    classNameContainer.push(className);
  }
  return <View className={classNameContainer.join(' ')}>{children}</View>;
};

export default Container;
