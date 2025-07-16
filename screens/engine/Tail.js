import React from 'react';
import { View } from 'react-native';

// Componente visual para la cola de la serpiente.
export default function Tail({ elements, size }) {
  return (
    <View>
      {elements.map((el, index) => (
        <View
          key={index}
          style={{
            width: size,
            height: size,
            backgroundColor: '#27AE60', // Verde más oscuro
            position: 'absolute',
            left: el[0] * size,
            top: el[1] * size,
            borderRadius: 3,
          }}
        />
      ))}
    </View>
  );
}
