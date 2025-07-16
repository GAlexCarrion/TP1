import { Dimensions } from 'react-native';

// Este archivo contiene todas las constantes y configuraciones del juego.
export default {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    GRID_SIZE: 20, // Tamaño de cada celda de la cuadrícula
    TICK_RATE: 100, // Velocidad del juego (milisegundos por tick)
}
