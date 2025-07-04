// App.tsx
import 'react-native-gesture-handler'; // ¡Importante para Gesture Handler!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GameNavigator from './navigations/navigation'; // Importa tu Drawer Navigator del juego

const App = () => {
  return (
    <NavigationContainer>
      {/* Asegúrate de que no haya ningún texto aquí fuera de GameNavigator */}
      <GameNavigator />
    </NavigationContainer>
  );
};

export default App;