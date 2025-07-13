import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeGameScreen from '../screens/JUEGO/Bienvenido';
import juego from '../screens/JUEGO/juego';
import ScoreScreen from '../screens/JUEGO/Puntuacion';

const Drawer = createDrawerNavigator();

const GameNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="WelcomeGame">
      <Drawer.Screen
        name="WelcomeGame"
        component={WelcomeGameScreen}
        options={{
          drawerLabel: 'Inicio del Juego',
          headerShown: false, 
        }}
      />
      <Drawer.Screen
        name="Game"
        component={juego}
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
