import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import Container from '@/components/Container';
import MenuCard from '@/components/MenuCard';
import InternalHeader from '@/components/InernalHeader';

export default function CalcsMenu() {
  const services = [
    {
      name: 'Cabos',
      icon: <MaterialIcons name="cable" size={48} color="#fff" />,
      route: '/cable-sizing',
    },
    {
      name: 'Queda de tensão',
      icon: <FontAwesome name="angle-double-down" size={48} color="#fff" />,
      route: '/voltage-drop',
    },
    {
      name: 'Disjuntores',
      icon: <MaterialIcons name="bolt" size={48} color="#fff" />,
      route: '/breaker-sizing',
    },
    {
      name: 'Conversões',
      icon: <MaterialIcons name="swap-horiz" size={48} color="#fff" />,
      route: '/conversions',
    },
    {
      name: 'Cálculo P · V · I',
      icon: <MaterialIcons name="power" size={48} color="#fff" />,
      route: '/power-calculations',
    },
    {
      name: 'Iluminação',
      icon: <MaterialIcons name="lightbulb" size={48} color="#fff" />,
      route: '/lighting',
    },
  ];
  return (
    <Fragment>
      <Container className="items-center bg-slate-900">
        <InternalHeader title="Cálculos Elétricos" />
        <View className="my-auto flex flex-row flex-wrap items-center gap-3">
          {services.map((service, index) => (
            <MenuCard
              onPress={() => alert('Button Pressed')}
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
