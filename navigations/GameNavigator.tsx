import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import WelcomeGameScreen from '../screens/JUEGO/Bienvenido';


import GuardarScreen from '../screens/data/GuardarScreen';
import LeerScreen from '../screens/data/LeerScreen';
import EditarScreen from '../screens/data/EditarScreen';
import EliminarScreen from '../screens/data/EliminarScreen';
import juego from '../screens/JUEGO/juego';
import Puntuacion from '../screens/JUEGO/Puntuacion';

const Drawer = createDrawerNavigator();

const GameNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Game">
      <Drawer.Screen
        name="WelcomeGame"
        component={WelcomeGameScreen}
        options={{
          drawerLabel: 'Inicio del Juego',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color="#2980B9" />
          ),
        }}
      />
      <Drawer.Screen
        name="Game"
        component={juego}
        options={{
          drawerLabel: 'Jugar Serpiente',
          headerTitle: 'El Juego de la Serpiente',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color="#27AE60" />
          ),
        }}
      />
      <Drawer.Screen
        name="Score"
        component={Puntuacion}
        options={{
          drawerLabel: 'Puntuaciones',
          headerTitle: 'Mejores Puntuaciones',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color="#F1C40F" />
          ),
        }}
      />
      <Drawer.Screen
        name="GuardarDatos"
        component={GuardarScreen}
        options={{
          drawerLabel: 'Guardar Datos',
          headerTitle: 'Guardar Usuario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="save" size={size} color="#8E44AD" />
          ),
        }}
      />
      <Drawer.Screen
        name="LeerDatos"
        component={LeerScreen}
        options={{
          drawerLabel: 'Ver Datos',
          headerTitle: 'Lista de Usuarios',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color="#2980B9" />
          ),
        }}
      />
      <Drawer.Screen
        name="EditarDatos"
        component={EditarScreen}
        options={{
          drawerLabel: 'Editar Datos',
          headerTitle: 'Editar Usuario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color="#D35400" />
          ),
        }}
      />
      <Drawer.Screen
        name="EliminarDatos"
        component={EliminarScreen}
        options={{
          drawerLabel: 'Eliminar Datos',
          headerTitle: 'Eliminar Usuario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trash" size={size} color="#C0392B" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default GameNavigator;
