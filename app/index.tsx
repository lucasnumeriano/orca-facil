import Button from '@/components/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { Fragment, JSX } from 'react';
import { View } from 'react-native';
import T from '../components/T';
import Container from '@/components/Container';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ButtonCard: React.FC<{
  onPress: () => void;
  title: string;
  icon: JSX.Element;
  backgroundColor?: string;
}> = ({ onPress, title, icon, backgroundColor }) => {
  return (
    <View className="flex max-w-24 flex-col items-center gap-5">
      <Button onPress={onPress} startIcon={icon} bgColor={backgroundColor} />
      <T variant="body" color="text-white" align="text-center">
        {title}
      </T>
    </View>
  );
};

export default function Index() {
  const router = useRouter();

  return (
    <Fragment>
      <Container className="items-center bg-slate-900">
        <View className="pb-5">
          <T variant="h2" color="text-yellow-400">
            Bem vindo ao
          </T>
          <View className="flex flex-row items-center gap-2">
            <MaterialCommunityIcons name="dolphin" size={24} color="#fff" />
            <T variant="h1" color="text-white">
              OrcaFácil
            </T>
          </View>
        </View>
        <T variant="body" color="text-white" align="text-center">
          Monte, salve e envie seus orçamentos de forma rápida e prática.
        </T>
        <View className="my-auto flex flex-row items-start gap-10">
          {/* <View className="flex flex-col items-center gap-5">
            <Button
              onPress={() => alert('Button Pressed')}
              startIcon={<FontAwesome6 name="book-open" size={48} color="#fff" />}
            />
            <T variant="body" color="text-white">
              Tabelas
            </T>
          </View>
          <View className="flex flex-col items-center gap-5">
            <Button
              onPress={() => router.push('/calcs-menu')}
              startIcon={<MaterialIcons name="bolt" size={48} color="#facc15" />}
            />
            <T variant="body" color="text-white">
              Cálculos Elétricos
            </T>
          </View> */}
          <ButtonCard
            onPress={() => router.push('/budgets')}
            icon={<MaterialIcons name="attach-money" size={48} color="#fff" />}
            title="Novo Orçamento"
            backgroundColor="bg-green-600"
          />
          <ButtonCard
            onPress={() => null}
            title="Histórico de Orçamentos"
            icon={<MaterialIcons name="format-list-numbered" size={48} color="#fff" />}
          />
        </View>
        <View className="pb-16">
          <T variant="body" color="text-white" align="text-center">
            💡 Dica: você pode gerar PDFs e enviar direto para o Email do cliente!
          </T>
        </View>
      </Container>
    </Fragment>
  );
}
