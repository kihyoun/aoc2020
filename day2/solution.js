const fs = require('fs');
// const filename = 'day2/demo.input.webarchive'
const filename = 'day2/input.webarchive'
let lines = [];
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
lines = file.split("\n");
let correctPasswords = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [rule, password] = line.split(':');
    const [limits, value] = rule.split(' ');
    const [min, max] = limits.split('-').map(v => parseInt(v, 10));
    let count = 0;
    let pos = password.indexOf(value);

    while (pos != -1) {
        count++;
        pos = password.indexOf(value, pos + 1);
    }

    if (count >= min && count <= max) {
        correctPasswords++;
    }
}

console.log(correctPasswords)