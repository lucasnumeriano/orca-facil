import { View } from 'react-native';
import T from './T';
import Button from './Button';
import { useRouter } from 'expo-router';

interface InternalHeaderProps {
  title: string;
}

const InternalHeader = ({ title }: InternalHeaderProps) => {
  const router = useRouter();
  return (
    <View className="flex w-full flex-row items-center justify-between">
      <Button
        color="text-white"
        title="Voltar"
        bgColor="bg-transparent"
        onPress={() => router.back()}
      />
      <T variant="h3" color="text-white">
        {title}
      </T>
    </View>
  );
};

export default InternalHeader;
