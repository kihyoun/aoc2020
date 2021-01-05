const fs = require('fs');
const filename = 'day08/input.webarchive'
// const filename = 'day08/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const registry = file.split("\n");

let accu = 0;
const history = [];

function execute(ptr) {

    if (typeof history.find(val => val === ptr) !== "undefined") {
        return;
    } else {
        history.push(ptr);
    }

    const [cmd, value] = registry[ptr].split(' ');

    switch (cmd) {
        case "nop":
            execute(ptr + 1);
            break;
        case "acc":
            accu += parseInt(value, 10);
            execute(ptr + 1);
            break;
        case "jmp":
            execute(ptr + parseInt(value, 10));
            break;
    }
}

execute(0);
console.log(accu)