import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeGameScreen from '../screens/JUEGO/Bienvenido';
import GameScreen from '../screens/JUEGO/Juego';
import ScoreScreen from '../screens/JUEGO/Puntuacion';

import GuardarScreen from '../screens/data/GuardarScreen';
import LeerScreen from '../screens/data/LeerScreen';
import EditarScreen from '../screens/data/EditarScreen';
import EliminarScreen from '../screens/data/EliminarScreen';

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
      <Drawer.Screen
        name="GuardarDatos"
        component={GuardarScreen}
        options={{
          drawerLabel: 'Guardar Datos',
          headerTitle: 'Guardar Usuario',
        }}
      />
      <Drawer.Screen
        name="LeerDatos"
        component={LeerScreen}
        options={{
          drawerLabel: 'Ver Datos',
          headerTitle: 'Lista de Usuarios',
        }}
      />
      <Drawer.Screen
        name="EditarDatos"
        component={EditarScreen}
        options={{
          drawerLabel: 'Editar Datos',
          headerTitle: 'Editar Usuario',
        }}
      />
      <Drawer.Screen
        name="EliminarDatos"
        component={EliminarScreen}
        options={{
          drawerLabel: 'Eliminar Datos',
          headerTitle: 'Eliminar Usuario',
        }}
      />
    </Drawer.Navigator>
  );
};

export default GameNavigator;