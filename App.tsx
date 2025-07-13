import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './FIREBASE/Config';
import { View, Text } from 'react-native';

import AuthNavigator from './navigations/AuthNavigator';
import GameNavigator from './navigations/GameNavigator';

type AppStackParamList = {
  Auth: undefined;
  GameModule: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  if (initializing) {
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
          <AppStack.Screen name="GameModule" component={GameNavigator} />
        ) : (
          <AppStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
