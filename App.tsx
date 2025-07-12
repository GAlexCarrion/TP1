
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './navigations/MainNavigator'; 

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator/>
      <StatusBar style="auto"/> 
    </NavigationContainer>
  );
}


