import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const juego = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Es hora de jugar a la serpiente!</Text>
      <Text style={styles.message}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005662',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#005662',
    textAlign: 'center',
  },
});

export default juego;