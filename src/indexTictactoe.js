const minMax = require("./minMax");

// Constantes del problema
const map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];//[[0, 1, 0], [2, 1, 0], [2, 0, 0]];
//Los 1 son las jugadas del jugador 1
//Los 2 son las jugadas del jugador 2
/**
 * root:  {state: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], turn: 1, level: 0, score: Number.MIN_SAFE_INTEGER}
 */

/**
 * Comprueba si un estado es una solición del triqui
 * @param {*} nodo 
 * @param {*} constantes 
 * @returns {boolean}
 */

function isSolution(nodo, constantes) {
    let solution = nodo.state;
    let full = true;
    for (let row in solution) {
        for (let cell in row) {
            if (cell == 0)
                full = false;
                break;
        }
        if(!full)
            break;  
    }
    let isSolution = false;

    if (solution[0][0] == solution[1][1] && solution[1][1] == solution[2][2] && solution[0][0] !=0) {
        isSolution = true;
    } 
    if (solution[0][2] == solution[1][1] && solution[0][2] == solution[2][0]  && solution[0][2] !=0) {
        isSolution = true;
    }
    if (!isSolution) {
        for (let i = 0; i < 3; i++) {
            if (solution[i][0] == solution[i][1] && solution[i][0] == solution[i][2] && solution[i][0] !=0) {
                isSolution = true;
                break;
            }
            if (solution[0][i] == solution[1][i] && solution[0][i] == solution[2][i] && solution[0][i] !=0) {
                isSolution = true;
                break;
            }
        }
    }
    
    return isSolution || full;
}
/**
 * nodo:
 *  state => [[0, 1, 0],[2, 0, 0],[0, 0, 0]]
 *  turn => 1 || 2
 * @param {*} nodo 
 * @param {*} constantes 
 * @returns 
 */
function getChildren(nodo, constantes) {
    let map = nodo.state;
    let children = []
    for (let row = 0; row <  3; row++) {
        for (let col = 0; col < 3;  col++) {
            if (map[row][col] == 0) {
                let nextState = JSON.parse(JSON.stringify(map));
                nextState[row][col] = nodo.turn;
                children.push({state: nextState, 
                    move: [row, col],
                    turn: nodo.turn == 1 ? 2 : 1, 
                    level: nodo.level + 1,
                    score: nodo.turn == 1 ? Number.MAX_SAFE_INTEGER: Number.MIN_SAFE_INTEGER
                });
            }
        }
    }
    return children;
}

function utilidad(node, constantes) {
    let solution = node.state;
    let winer = 0;

    if (solution[0][0] == solution[1][1] && solution[1][1] == solution[2][2] && solution[0][0] !=0) {
        winer = solution[1][1];
    } 
    if (solution[0][2] == solution[1][1] && solution[0][2] == solution[2][0]  && solution[0][2] !=0) {
        winer = solution[1][1];
    }
    if (winer==0) {
        for (let i = 0; i < 3; i++) {
            if (solution[i][0] == solution[i][1] && solution[i][0] == solution[i][2] && solution[i][0] !=0) {
                winer = solution[i][0]
                break;
            }
            if (solution[0][i] == solution[1][i] && solution[0][i] == solution[2][i] && solution[0][i] !=0) {
                winer = solution[0][i]
                break;
            }
        }
    }
    if (winer == 0)
        return 0;
    else {
        return winer == 1? 1: -1;
    }
}

function hashFunction(node) {
    return node.value.x + '-' + node.value.y;
}

let constantes = {map}
let problem = {constantes, isSolution, getChildren, utilidad, hashFunction}

console.log(minMax(problem)); // Debe retornar la siguiente jugada con su máximo score pos: [1, 1], score: 0

/** 
let root = {value: constantes.start, actions: '', level: 0};
let children = getChildren(root, constantes);
console.log(children)
console.log(children.length == 2);
console.log(children[0].actions == 'U');
console.log(children[0].value.x == root.value.x);
console.log(children[0].value.y == root.value.y - 1);
console.log(children[0].level == 1);
console.log(children[1].actions == 'D');
console.log(children[1].value.x == root.value.x);
console.log(children[1].value.y == root.value.y + 1);
console.log(children[1].level == 1);
console.log(isSolution(children[1], constantes) == false);
*/