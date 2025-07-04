// navigations/GameNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native'; // Importa View y Text por si acaso

// Importa tus pantallas
import WelcomeGameScreen from '../screens/JUEGO/Bienvenido';
import GameScreen from '../screens/JUEGO/juego';
import ScoreScreen from '../screens/JUEGO/score';

const Drawer = createDrawerNavigator();

const GameNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="WelcomeGame">
      <Drawer.Screen
        name="WelcomeGame"
        component={WelcomeGameScreen}
        options={{
          drawerLabel: 'Inicio del Juego',
          headerShown: false, // Opcional: Ocultar el encabezado en la pantalla de bienvenida
        }}
      />
      <Drawer.Screen
        name="Game"
        component={GameScreen}
        options={{
          drawerLabel: 'Jugar Serpiente',
          headerTitle: 'El Juego de la Serpiente',
        }}
      />
      <Drawer.Screen
        name="Score"
        component={ScoreScreen}
        options={{
          drawerLabel: 'Puntuaciones',
          headerTitle: 'Mejores Puntuaciones',
        }}
      />
    </Drawer.Navigator>
  );
};

export default GameNavigator;