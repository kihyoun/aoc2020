const fs = require('fs');
const filename = 'day04/demo.input.webarchive'
// const filename = 'day04/input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
