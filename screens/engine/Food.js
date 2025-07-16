import React from 'react';
import { View } from 'react-native';

// Componente visual para la comida.
export default function Food({ position, size }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#E74C3C', // Rojo
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 20, // Círculo
      }}
    />
  );
}
