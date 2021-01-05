const fs = require('fs');
const filename = 'day09/input.webarchive'
// const filename = 'day09/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

const preamble = 25;
let invalid = 0;
let position = 0;

for (let ptr = preamble; ptr < lines.length; ptr++) {
    let test = parseInt(lines[ptr], 10);
    let valid = false;

    for (let i = ptr - preamble; i < ptr - 1; i++) {
        for (let k = ptr - preamble + 1; k < ptr; k++) {
            const sum = parseInt(lines[i], 10) + parseInt(lines[k], 10);

            if (sum === test) {
                valid = true;
                break;
            }
        }

        if (valid) {
            break;
        }
    }

    if (!valid) {
        invalid = test;
        position = ptr;
        break;
    }
}

const reducer = (accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10);
const minReducer = (accumulator, currentValue) => Math.min(parseInt(accumulator, 10), parseInt(currentValue, 10));
const maxReducer = (accumulator, currentValue) => Math.max(parseInt(accumulator, 10), parseInt(currentValue, 10));

for (let size = position - 1; size > 0; size--) {
    for (let i = 0; i < size; i++) {
        let sum = lines.slice(i, size).reduce(reducer);
        if (sum === invalid) {
            const min = lines.slice(i, size).reduce(minReducer);
            const max = lines.slice(i, size).reduce(maxReducer);
            result = min + max
            console.log(result, sum, min, max)
        }
    }
}

