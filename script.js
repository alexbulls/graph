const matrix = {
    a: ['b', 'e', 'g', 'h', 'i', 'k'],
    b: ['a', 'c', 'e', 'g', 'j', 'k'],
    c: ['b', 'f', 'g', 'l', 'm'],
    d: ['b', 'c', 'k'],
    e: ['a', 'b', 'j', 'l'],
    f: ['c', 'i'],
    g: ['a', 'b', 'c'],
    h: ['a', 'i'],
    i: ['a', 'f', 'h', 'n'],
    j: ['b', 'e'],
    k: ['a', 'b', 'd'],
    l: ['e', 'n'],
    m: [],
    n: ['l', 'i'],
};

const outputPathNode = document.getElementById('output-graph-path');
const outputResultNode = document.getElementById('output-graph-result');
const inputGraphNode = document.getElementById('input-graph-name');

inputGraphNode.addEventListener('input', ({ target }) => {
    const valueLower = target.value.toLowerCase();

    if (valueLower.length === 1) {
        searchGraph(valueLower);
    }
});

function searchGraph(sought, startArr) {
    if (!sought) {
        return;
    }

    const visited = [];
    const history = [];
    const matrixClone = getMatrixClone();
    const queue = startArr ? startArr : matrixClone[sought];

    outputPathNode.innerHTML = '';

    if (!queue) {
        outputResultNode.innerHTML = `Is absent - ${sought}`;
        return;
    }

    let counter = 0;
    let pathOutput = '';
    let historyCounter = 1;
    let graphName = sought;
    let graphCurrent = queue;
    let graphLen = graphCurrent.length;
    let timestampStart = performance.now();

    for (const item of queue) {
        const node = queue.shift();

        if (!visited.includes(node)) {
            if (node === sought) {
                const timeDiff = performance.now() - timestampStart;

                pathOutput += node;

                outputPathNode.innerHTML = pathOutput;
                outputResultNode.innerHTML = `
                    Found - <strong>${node}</strong>.
                    Position - <strong>${counter}</strong>.
                    GraphKey - <strong>${graphName}</strong>.
                    GraphValue - <strong>[${graphCurrent}]</strong>.
                    GraphDepth - <strong>${historyCounter}</strong>.
                    MS - <strong>${timeDiff}</strong>.
                `;

                return;
            } else {
                pathOutput += `${node} => `;

                outputPathNode.innerHTML = pathOutput;

                queue.push(...matrixClone[node]);
                visited.push(node);
            }
        }

        history.push(node);

        counter++;

        if (counter === graphLen) {
            graphName = history[graphLen - counter];
            graphCurrent = matrixClone[graphName];
            graphLen = graphCurrent.length;
            counter = 0;
            historyCounter++;
        }
    }

    outputResultNode.innerHTML = 'No matches found';
}

function getMatrixClone() {
    const matrixClone = {};

    Object.keys(matrix).forEach(key => { matrixClone[key] = [...matrix[key]] });

    return matrixClone;
}