const fs = require('fs');
const filename = 'day14/input.webarchive'
// const filename = 'day14/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
//console.log(parseInt("100", 2).toString(10))
const mem = {};

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function pad(num, size) {
    while (num.length < size) num = "0" + num;
    return num;
}

function apply(mask, value) {
    let result = value;
    for (let n = 0; n < 36; n++) {
        if (mask.charAt(n) !== "X") {
            result = result.replaceAt(n, mask.charAt(n));
        }
    }
    return result;
}

let mask;

lines.forEach(line => {
    if (line.substr(0, 4) === "mask") {
        mask = line.substr(7);
        console.log(mask)
    } else {
        const [pos, value] = line.split(" = ")
        const value_bin = pad(parseInt(value, 10).toString(2), 36);
        mem[pos] = parseInt(apply(mask, value_bin), 2)
    }
})

const reducer = (accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10);

console.log(Object.values(mem).reduce(reducer))