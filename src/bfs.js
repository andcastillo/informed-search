function addToQueue(queue, nodes) {
    queue.push(...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift()
}

//let problem = {constantes, isSolution, getChildren}
function bfs(problem) {
    let root = {value: problem.constantes.start, actions: '', level: 0};
    let cola = addToQueue([], [root]);
    while (true) {
        if (cola.length == 0) {
            return false;
        }
        else {
            let nodo = removeFromQueue(cola);
            //Expandir
            if (problem.isSolution(nodo, problem.constantes)) {
                return nodo.actions;
            } else {
                addToQueue(cola, problem.getChildren(nodo, problem.constantes));
            }
        }
    }
}

module.exports = bfs;