const fs = require('fs');
// const filename = 'day07/input.webarchive'
const filename = 'day07/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
console.log(lines)