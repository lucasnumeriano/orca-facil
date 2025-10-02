import { Pressable, View } from 'react-native';
import T from './T';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const MenuCard = ({ icon, title, onPress }: MenuCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex h-36 w-36 flex-col items-center justify-center rounded bg-blue-500 p-2">
        {icon}
        <T variant="body" color="text-white" align="text-center">
          {title}
        </T>
      </View>
    </Pressable>
  );
};

export default MenuCard;
