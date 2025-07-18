import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 

import Bienvenido from '../screens/JUEGO/Bienvenido';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegistroScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>(); 
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen
        name="Welcome"
        component={Bienvenido}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Crear Cuenta' }} 
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
