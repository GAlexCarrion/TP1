import Constants from './constants';

// Genera una posición aleatoria.
const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// --- Este es el cerebro del juego ---
export const GameLoop = (entities, { touches, dispatch, events }) => {
    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;

    // --- Lógica de Movimiento ---
    if (events.length) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-up" && head.speed[1] !== 1) {
                head.speed = [0, -1];
            } else if (events[i].type === "move-down" && head.speed[1] !== -1) {
                head.speed = [0, 1];
            } else if (events[i].type === "move-left" && head.speed[0] !== 1) {
                head.speed = [-1, 0];
            } else if (events[i].type === "move-right" && head.speed[0] !== -1) {
                head.speed = [1, 0];
            }
        }
    }

    head.nextMove -= 1;
    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency;

        // Mueve la cola
        if (tail.elements.length > 0) {
            tail.elements = [[head.position[0], head.position[1]], ...tail.elements.slice(0, -1)];
        }

        // Mueve la cabeza
        head.position[0] += head.speed[0];
        head.position[1] += head.speed[1];

        // --- Lógica de Colisión con la Comida ---
        if (head.position[0] === food.position[0] && head.position[1] === food.position[1]) {
            // Crece la cola
            tail.elements = [[food.position[0], food.position[1]], ...tail.elements];
            
            // Reposiciona la comida
            food.position = [
                randomBetween(0, (Constants.MAX_WIDTH / Constants.GRID_SIZE) - 1),
                randomBetween(0, (Constants.MAX_HEIGHT / Constants.GRID_SIZE) - 5)
            ];

            // Envía un evento para aumentar el puntaje
            dispatch({ type: "eat" });
        }

        // --- Lógica de Colisión con las Paredes ---
        if (head.position[0] < 0 || head.position[0] >= Constants.MAX_WIDTH / Constants.GRID_SIZE ||
            head.position[1] < 0 || head.position[1] >= (Constants.MAX_HEIGHT / Constants.GRID_SIZE) - 5) {
            dispatch({ type: "game-over" });
        }

        // --- Lógica de Colisión con la Cola ---
        for (let i = 0; i < tail.elements.length; i++) {
            if (head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]) {
                dispatch({ type: "game-over" });
            }
        }
    }

    return entities;
};
