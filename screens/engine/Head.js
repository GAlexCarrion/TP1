import React from 'react';
import { Image } from 'react-native';

import snakeHeadImage from '../../assets/—Pngtree—vector of snake head_5516270.png';

export default function Head({ position, size }) {
  return (
    <Image
      source={snakeHeadImage}
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
