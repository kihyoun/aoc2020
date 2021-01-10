const fs = require('fs');
const filename = 'day11/input.webarchive'
// const filename = 'day11/demo.input.webarchive'
// const filename = 'day11/demo.input2.webarchive'
// const filename = 'day11/demo.input3.webarchive'

const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const matrix = file.split("\n");

const printMatrix = (matrix) => matrix.forEach(line => console.log(line));
const seat = (x, y, matrix) => {
    if (x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length) return;
    return matrix[y].charAt(x);
}
const replaceAt = (str, index, replacement) => str.substr(0, index) + replacement + str.substr(index + replacement.length);
const replace = (x, y, matrix, val) => matrix[y] = replaceAt(matrix[y], x, val);
const occupied = (matrix) => {
    let num = 0;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (seat(x, y, matrix) === "#") {
                num++;
            }
        }
    }
    return num;
}

function equals(a, b) {
    for (let y = 0; y < a.length; y++) {
        for (let x = 0; x < a[0].length; x++) {
            if (seat(x, y, a) !== seat(x, y, b)) {
                return false;
            }
        }
    }

    return true;
}

const adjacent = (x, y, matrix) => {
    const adj = [];
    const evaluate = (x, y) => {
        let cell = seat(x, y, matrix);
        if (typeof cell === 'undefined') {
            return true;
        }
        if (cell === "#" || cell === "L") {
            adj.push(cell);
            return true;
        }
        return false;
    }

    // top
    let cy = y, cx = x;
    while (true) {
        cy = cy - 1;
        if (evaluate(cx, cy)) break;
    }
    // top right
    cy = y, cx = x;
    while (true) {
        cy = cy - 1;
        cx = cx + 1;
        if (evaluate(cx, cy)) break;
    }

    // right
    cy = y, cx = x;
    while (true) {
        cx = cx + 1;
        if (evaluate(cx, cy)) break;
    }
    // bottom right
    cy = y, cx = x;
    while (true) {
        cx = cx + 1; cy = cy + 1;
        if (evaluate(cx, cy)) break;
    }
    //bottom
    cy = y, cx = x;
    while (true) {
        cy = cy + 1;
        if (evaluate(cx, cy)) break;
    }
    // bottom left
    cy = y, cx = x;
    while (true) {
        cx = cx - 1; cy = cy + 1;
        if (evaluate(cx, cy)) break;
    }
    // left
    cy = y, cx = x;
    while (true) {
        cx = cx - 1;
        if (evaluate(cx, cy)) break;
    }
    // top left
    cy = y, cx = x;
    while (true) {
        cx = cx - 1; cy = cy - 1;
        if (evaluate(cx, cy)) break;
    }

    return adj;
}

// console.log(seat(0, 0, matrix))
// printMatrix(matrix)
// console.log(occupied(matrix))

const computeCell = (x, y, matrix) => {
    const cell = seat(x, y, matrix);
    const adj = adjacent(x, y, matrix);
    switch (cell) {
        case "L":
            if (typeof adj.find(cell => cell === "#") === "undefined")
                return "#";
        case "#":
            const reducer = (acc, currentValue) => {
                if (currentValue === "#") acc++;
                return acc;
            }

            if (adj.reduce(reducer, 0) > 4) return "L";
        default: return cell;
    }
}

const copy = matrix => matrix.slice(0, matrix.length);

let matrixFirst = copy(matrix);
let matrixNext;

while (true) {
    matrixNext = copy(matrixFirst);
    for (let x = 0; x < matrix[0].length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            const computedCell = computeCell(x, y, matrixFirst);
            replace(x, y, matrixNext, computedCell);
        }
    }

    if (equals(matrixFirst, matrixNext)) {
        break;
    }

    matrixFirst = copy(matrixNext);
}

printMatrix(matrixNext)
console.log(occupied(matrixNext))

// console.log(seat(3, 3, matrix))
// console.log(adjacent(3, 3, matrix))