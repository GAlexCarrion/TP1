import React from 'react';
import Constants from './constants';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';

// Genera una posición aleatoria para la comida.
const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function entities() {
    let engine = null;
    let head = null;
    let food = null;
    let tail = null;

    // Inicializa las entidades del juego
    head = {
        position: [0, 0],
        size: Constants.GRID_SIZE,
        speed: [1, 0], // Moviéndose a la derecha inicialmente
        nextMove: 10,
        updateFrequency: 10,
        renderer: <Head />
    };

    food = {
        position: [
            randomBetween(0, (Constants.MAX_WIDTH / Constants.GRID_SIZE) - 1),
            randomBetween(0, (Constants.MAX_HEIGHT / Constants.GRID_SIZE) - 5) // -5 para no aparecer bajo los controles
        ],
        size: Constants.GRID_SIZE,
        renderer: <Food />
    };

    tail = {
        size: Constants.GRID_SIZE,
        elements: [],
        renderer: <Tail />
    };

    return {
        head,
        food,
        tail
    }
}
