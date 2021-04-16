function addToQueue(queue, nodes) {
    queue.splice(0, 0, ...nodes);
    return queue;
}

function removeFromQueue(queue) {
    return queue.shift()
}

//let problem = {constantes, isSolution, getChildren}
function minMax(problem) {
    let root = {value: problem.constantes.start, actions: '', level: 0, type: "max", utilidad=99999999};
    let hashTable = {}; 
    let cola = addToQueue([], [root]);
    while (true) {
        if (cola.length == 0) {
            return false;
        }
        else {
            let nodo = removeFromQueue(cola);
            //Expandir
            if (problem.isSolution(nodo, problem.constantes)) {
                nodo.utilidad = problem.utilidad(nodo, problem.constantes)
            } else {
                let children = problem.getChildren(nodo, problem.constantes);
                children = children.filter(node => {
                    let key = problem.hashFunction(node);
                    if (!hashTable[key]) {
                        hashTable[key] = 1
                        return true;
                    } else {
                        return false;
                    }
                });
                addToQueue(cola, children);
            }
        }
    }
}

module.exports = minMax;