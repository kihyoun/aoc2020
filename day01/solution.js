const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
// const filename = 'day01/demo.input.webarchive'
const filename = 'day01/input.webarchive'
let lines = [];
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
lines = file.split("\n");


for (let i = 0; i < lines.length - 1; i++) {
    for (let k = i + 1; k < lines.length; k++) {
        const sum = parseInt(lines[i], 10) + parseInt(lines[k], 10);
        if (sum === 2020) {
            const solution = parseInt(lines[i], 10) * parseInt(lines[k], 10);
            console.log("Solution: ", solution);
            process.exit(0)
        }
    }
}