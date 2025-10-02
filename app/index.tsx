import Button from '@/components/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import T from '../components/T';
import Container from '@/components/Container';

export default function Index() {
  return (
    <Fragment>
      <Container className="items-center bg-slate-900">
        <T variant="h2" color="text-yellow-400">
          Bem vindo ao
        </T>
        <T variant="h1" color="text-white">
          EletroRef
        </T>
        <View className=" my-auto flex flex-row items-center gap-10">
          <View className="flex flex-col items-center gap-5">
            <Button
              onPress={() => alert('Button Pressed')}
              startIcon={<MaterialIcons name="bolt" size={48} color="#facc15" />}
            />
            <T variant="body" color="text-white">
              Cálculos Elétricos
            </T>
          </View>
          <View className="flex flex-col items-center gap-5">
            <Button
              onPress={() => alert('Button Pressed')}
              startIcon={<FontAwesome6 name="book-open" size={48} color="#fff" />}
            />
            <T variant="body" color="text-white">
              Tabelas
            </T>
          </View>
        </View>
      </Container>
    </Fragment>
  );
}
