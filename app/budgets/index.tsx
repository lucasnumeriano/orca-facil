import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Container from '@/components/Container';
import MenuCard from '@/components/MenuCard';
import InternalHeader from '@/components/InernalHeader';

export default function Budgets() {
  const services = [
    {
      name: 'Por Hora',
      icon: <MaterialIcons name="hourglass-top" size={48} color="#fff" />,
      route: '/budgets/por-hora',
    },
    {
      name: 'Por Metro ²',
      icon: <MaterialCommunityIcons name="diameter-outline" size={48} color="#fff" />,
      route: '/budgets/por-metro-quadrado',
    },
    {
      name: 'Por Dia',
      icon: <AntDesign name="sun" size={48} color="#fff" />,
      route: '/budgets/por-dia',
    },
  ];

  return (
    <Fragment>
      <Container className="items-center bg-slate-900">
        <InternalHeader title="Orçamentos" />
        <View className="my-auto flex flex-row flex-wrap items-center gap-3">
          {services.map((service, index) => (
            <MenuCard
              onPress={() => router.push(service.route as any)}
              icon={service.icon}
              title={service.name}
              key={index}
            />
          ))}
        </View>
      </Container>
    </Fragment>
  );
}
