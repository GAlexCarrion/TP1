import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa para manejar el estado de autenticación

// Importa tus navegadores modulares
import AuthNavigator from './AuthNavigator'; // Tu navegador de autenticación
import GameNavigator from './GameNavigator'; // Tu navegador de juego (Drawer)

import { View , Text } from 'react-native';

const Stack = createStackNavigator();

export default function Navegador() {
  const [user, setUser] = useState<any | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // Para saber cuándo Firebase Auth ha terminado de cargar

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false); // La autenticación ha terminado de cargar
    });
    return unsubscribe; // Limpia el listener al desmontar el componente
  }, []);

  if (loadingAuth) {
    // Puedes mostrar una pantalla de carga aquí mientras se verifica la autenticación
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C3E50' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, // Oculta la cabecera por defecto en el Stack principal
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {/* Renderiza condicionalmente el navegador de autenticación o el de juego */}
        {user ? (
          // Si el usuario está autenticado, muestra el navegador de juego (Drawer)
          <Stack.Screen name="App" component={GameNavigator} />
        ) : (
          // Si el usuario NO está autenticado, muestra el navegador de autenticación
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


