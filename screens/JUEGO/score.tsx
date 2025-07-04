

// screens/juego/ScoreScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejores Puntuaciones</Text>
      <Text style={styles.message}>Aquí se mostrarán tus puntuaciones más altas.</Text>
      {/* Futura implementación para mostrar puntuaciones de Firebase */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDAB9', // Un durazno claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A0522D',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#A0522D',
    textAlign: 'center',
  },
});

export default ScoreScreen;