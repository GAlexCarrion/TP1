import React from 'react';
import { View } from 'react-native';

// Componente visual para la cabeza de la serpiente.
export default function Head({ position, size }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#2ECC71', // Verde brillante
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#27AE60'
      }}
    />
  );
}
