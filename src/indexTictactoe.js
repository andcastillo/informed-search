const minMax = require("./minMax");

// Constantes del problema
const map = [[0, 1, 0], [2, 2, 0], [0, 1, 0]];
//Los 1 son las jugadas del jugador 1
//Los 2 son las jugadas del jugador 2

function isSolution(nodo, constantes) {
    let solution = constantes.solution;
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
        break;
    } 
    if (solution[0][2] == solution[1][1] && solution[0][2] == solution[2][0]  && solution[0][2] !=0) {
        isSolution = true;
        break;
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

function getChildren(nodo, constantes) {
    let map = constantes.map;
    let children = []
    // Left
    if (nodo.value.x >= 1 && map[nodo.value.y][nodo.value.x - 1] == 0) {
        children.push({value: {x: nodo.value.x - 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'L',
                        level: nodo.level + 1
        });
    }
    // Up
    if (nodo.value.y >= 1 && map[nodo.value.y - 1][nodo.value.x] == 0) {
        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y - 1},
                        actions: nodo.actions + 'U',
                        level: nodo.level + 1
        });
    }
    // Right
    if (nodo.value.x < map[0].length - 1 && map[nodo.value.y ][nodo.value.x + 1] == 0) {
        children.push({value: {x: nodo.value.x + 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'R',
                        level: nodo.level + 1
        });
    }
    // Down
    if (nodo.value.y < map.length - 1 && map[nodo.value.y + 1][nodo.value.x] == 0) {
        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y + 1},
                        actions: nodo.actions + 'D',
                        level: nodo.level + 1
        });
    }

    return children;
}

function hashFunction(node) {
    return node.value.x + '-' + node.value.y;
}

let constantes = {map, solution, start, actions, costs}
let problem = {constantes, isSolution, getChildren, hashFunction}

let method = process.argv.slice(2);
let result = '';
if (method == 'bfs')
    result = bfs(problem);
if (method == 'dfs')
    result = dfs(problem);

console.log(result); // "RUUUUU"


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