function addToQueue(queue, nodes) {
    queue.splice(0, 0, ...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift()
}

//let problem = {constantes, isSolution, getChildren}
function minMax(problem) {
    let nodo = {state: problem.constantes.map, turn: 1, level: 0, score: Number.MIN_SAFE_INTEGER};
    let solution = _minimax(nodo, problem);
    console.log(nodo);
    return solution;
}

function _minimax(nodo, problem) {
    let isMax = nodo.turn == 1;

    if (problem.isSolution(nodo, problem.constantes)) {
        nodo.score = problem.utilidad(nodo, problem.constantes);
        return nodo;
    }

    let children = problem.getChildren(nodo);
    let bestScore = nodo.score;
    let bestChild = {}
    for (child of children) {
        let current = _minimax(child, problem);
        if (isMax) {
            if (current.score > bestScore) {
                bestScore = current.score;
                bestChild = current;
            }
        } else {
            if (current.score < bestScore) {
                bestScore = current.score;
                bestChild = current;
            }
        }
    }
    nodo.score = bestScore;
    nodo.nextMove = bestChild.move;
    return nodo;
}

module.exports = minMax;