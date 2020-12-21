const fs = require('fs');
const filename = 'day06/input.webarchive'
// const filename = 'day06/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
const groups = [];
let currentGroup = '';

lines.forEach(line => {
    currentGroup += line;

    if (line.length === 0) {
        groups.push(currentGroup);
        currentGroup = "";
    }
});

groups.push(currentGroup);

let sum = 0;

groups.forEach(group => {
    const answers = [];
    for (let k = 0; k < group.length; k++) {
        const cur = group.substring(k, k + 1);
        if (typeof answers.find(letter => cur === letter) === "undefined") {
            answers.push(cur);
        }
    }
    sum += answers.length;
});

console.log(sum)