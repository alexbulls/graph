const object = {
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

searchGraph('l');

function searchGraph(sought, startArr) {
    if (!sought) {
        return;
    }

    const visited = [];
    const history = [];
    const queue = startArr ? startArr : object[sought];

    if (!queue) {
        console.log(`Is absent - ${sought}`);
        return;
    }

    let counter = 0;
    let historyCounter = 1;
    let graphName = sought;
    let graphCurrent = startArr ? startArr : object[sought];
    let graphLen = graphCurrent.length;

    for (let i = 0; i < queue.length; i++) {
        const node = queue.shift();

        if (!visited.includes(node)) {
            if (node === sought) {
                console.log(`Found - ${node}. Position - ${counter}. Graph key - ${graphName}. Graph value - ${graphCurrent}. Graph depth - ${historyCounter}`);
                return;
            } else {
                console.log(node);
                queue.push(...object[node]);
                visited.push(node);
            }
        }

        history.push(node);

        counter++;

        if (counter === graphLen) {
            graphName = history[graphLen - counter];
            graphCurrent = object[graphName];
            graphLen = graphCurrent.length;
            counter = 0;
            historyCounter++;
        }
    }

    console.log('No matches found');
}