// App.tsx
import 'react-native-gesture-handler'; // Importante para Gesture Handler
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Cambiado a createStackNavigator
import { onAuthStateChanged, User } from 'firebase/auth'; // Importa onAuthStateChanged y User
import { auth } from './FIREBASE/Config'; // Importa la instancia de autenticación
import { View, Text } from 'react-native'; // Asegúrate de importar View y Text

// Importa tus navegadores
import AuthNavigator from './navigations/AuthNavigator'; // Navegador para Login/Registro
import GameNavigator from './navigations/GameNavigator'; // Tu Drawer Navigator del juego

// Define los tipos para el navegador principal (AppNavigator)
type AppStackParamList = {
  Auth: undefined; // Ruta para el Stack Navigator de autenticación
  GameModule: undefined; // Ruta para el Drawer Navigator del juego
};

const AppStack = createStackNavigator<AppStackParamList>(); // Cambiado a createStackNavigator

const App = () => {
  // Estado para almacenar el usuario autenticado (null si no hay usuario)
  const [user, setUser] = useState<User | null>(null);
  // Estado para saber si Firebase Auth ya ha terminado de verificar el estado inicial
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // onAuthStateChanged se dispara cuando el estado de autenticación cambia
    // (al iniciar sesión, cerrar sesión, o al cargar la app si ya hay una sesión activa)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado del usuario
      if (initializing) {
        setInitializing(false); // Marca que la inicialización ha terminado
      }
    });

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    // Esto detiene la escucha del estado de autenticación
    return unsubscribe;
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  if (initializing) {
    // Opcional: Mostrar una pantalla de carga mientras se verifica el estado de autenticación
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando aplicación...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Si hay un usuario autenticado, muestra el módulo del juego
          <AppStack.Screen name="GameModule" component={GameNavigator} />
        ) : (
          // Si no hay usuario autenticado, muestra el flujo de autenticación
          <AppStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
