import React from 'react';
import Constants from './constants';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function entities() {
    let head = null;
    let food = null;
    let tail = null;

    const centerX = Math.floor((Constants.MAX_WIDTH / Constants.GRID_SIZE) / 2);
    const centerY = Math.floor((Constants.MAX_HEIGHT / Constants.GRID_SIZE) / 2);

    head = {
        position: [centerX, centerY], 
        size: Constants.GRID_SIZE,
        speed: [1, 0],
        nextMove: 8,
        updateFrequency: 8,
        renderer: <Head />
    };

    food = {
        position: [
            randomBetween(0, (Constants.MAX_WIDTH / Constants.GRID_SIZE) - 1),
            randomBetween(0, (Constants.MAX_HEIGHT / Constants.GRID_SIZE) - 10) 
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
