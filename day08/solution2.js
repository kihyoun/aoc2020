const fs = require('fs');
const filename = 'day08/input.webarchive'
// const filename = 'day08/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const registry = file.split("\n");
const haystack = [];

registry.forEach((instruction, idx) => {
    const [cmd, value] = instruction.split(' ');
    if (cmd === "nop" || cmd === "jmp") {
        haystack.push(idx);
    }
});

function execute(ptr, history, registry, accu) {

    if (ptr >= registry.length) {
        return accu;
    } else if (typeof history.find(val => val === ptr) !== "undefined") {
        return false;
    } else {
        history.push(ptr);
    }

    const [cmd, value] = registry[ptr].split(' ');

    switch (cmd) {
        case "nop":
            return execute(ptr + 1, history, registry, accu);
        case "acc":
            accu += parseInt(value, 10);
            return execute(ptr + 1, history, registry, accu);
        case "jmp":
            return execute(ptr + parseInt(value, 10), history, registry, accu);
    }
}

haystack.forEach(ptr => {
    const fixedRegistry = registry.slice(0, registry.length);
    if (fixedRegistry[ptr] === 'nop') {
        fixedRegistry[ptr] = "jmp";
    } else {
        fixedRegistry[ptr] = "nop";
    }

    const accu = execute(0, [], fixedRegistry, 0);
    if (accu) {
        console.log('Found', accu)
    } else {
        console.log('not found.')
    }
})
