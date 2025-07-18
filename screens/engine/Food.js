import React from 'react';
import { Image } from 'react-native';

import appleImage from '../../assets/—Pngtree—apple fruit cartoon apple cartoon_3779367.png';

export default function Food({ position, size }) {
  return (
    <Image
      source={appleImage}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        left: position[0] * size,
        top: position[1] * size,
      }}
    />
  );
}
