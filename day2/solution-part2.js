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
    const [positions, value] = rule.split(' ');
    const [rule1, rule2] = positions.split('-').map(v => parseInt(v, 10));
    const pos1 = password.substring(rule1, rule1 + 1);
    const pos2 = password.substring(rule2, rule2 + 1);
    // console.log('Positions for', value)
    // console.log("Pos 1:", pos1)
    // console.log("Pos 2:", pos2)

    if ((pos1 !== value && pos2 === value)
        || (pos1 === value && pos2 !== value)) {
        correctPasswords++
    }
}

console.log(correctPasswords)