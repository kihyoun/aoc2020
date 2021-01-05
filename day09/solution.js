const fs = require('fs');
const filename = 'day09/input.webarchive'
// const filename = 'day09/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

const preamble = 25;

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
        console.log(test);
        break;
    }
}