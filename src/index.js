const map = [[1, 1, 1, 1, 1, 1, 1, 1],
 [1, 0, 0, 0, 0, 0, 0, 1],
 [1, 1, 0, 1, 0, 1, 1, 1],
 [1, 0, 0, 0, 0, 1, 0, 1],
 [1, 0, 1, 1, 0, 1, 0, 1],
 [1, 0, 0, 1, 0, 1, 0, 1],
 [1, 1, 0, 1, 0, 1, 0, 1],
 [1, 0, 0, 1, 0, 0, 0, 1],
 [1, 0, 1, 1, 0, 1, 0, 1],
 [1, 0, 0, 0, 0, 1, 0, 1],
 [1, 0, 1, 0, 0, 1, 0, 1],
 [1, 1, 1, 1, 1, 1, 1, 1]];

const start = { x: 1, y: 7 };
const solution = { x: 6, y: 6 };
const actions = ['L', 'U', 'R', 'D'];
const costs = [1, 1, 1, 1];

// Búsqueda por amplitud
nodo = {value: {x: 10, y: 0}, actions: 'UU', level: 2};

function isSolution(nodo, constantes) {
    solution = constantes.solution;
    if (nodo.value.x == solution.x &&
        nodo.value.y == solution.y)
        return true;
    return false;
}

function getChildren(nodo, constantes) {
    map = constantes.map;
    children = []
    // Left
    if (nodo.value.x >= 1 && map[nodo.value.x - 1][nodo.value.y] <= 0) {
        children.push({value: {x: nodo.value.x - 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'L',
                        level: nodo.level.level + 1
        });
    }
    // Up
    if (nodo.value.y >= 1 && map[nodo.value.x][nodo.value.y - 1] <= 0) {
        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y - 1},
                        actions: nodo.actions + 'U',
                        level: nodo.level.level + 1
        });
    }
    // Right
    if (nodo.value.x < map[0].length - 1 && map[nodo.value.x + 1 ][nodo.value.y] <= 0) {
        children.push({value: {x: nodo.value.x + 1,
                               y: nodo.value.y},
                        actions: nodo.actions + 'R',
                        level: nodo.level.level + 1
        });
    }
    // Down
    if (nodo.value.y < map.length - 1 && map[nodo.value.x][nodo.value.y + 1] <= 0) {
        children.push({value: {x: nodo.value.x,
                               y: nodo.value.y + 1},
                        actions: nodo.actions + 'D',
                        level: nodo.level.level + 1
        });
    }

    return children;
}

function BFS(problem){

}