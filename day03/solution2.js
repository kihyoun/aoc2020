const fs = require('fs');
// const filename = 'day03/demo.input.webarchive'
const filename = 'day03/input.webarchive'

const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
const width = lines[0].length;
const height = lines.length;

// 0-Base
const getCell = (x, y) => {
    const virtualX = x % width;
    return lines[y].substring(virtualX, virtualX + 1);
}

const hasTree = (x, y) => {
    return getCell(x, y) === "#";
}

const slope = (right, down) => {
    let numTrees = 0, x = 0;

    for (let y = 0; y < height; y += down) {
        if (hasTree(x, y)) {
            numTrees++;
        }

        x += right;
    }

    return numTrees;
}

const fac =
    slope(1, 1)
    * slope(3, 1)
    * slope(5, 1)
    * slope(7, 1)
    * slope(1, 2);
console.log(fac)


