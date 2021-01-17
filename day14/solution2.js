const fs = require('fs');
const filename = 'day14/input.webarchive'
// const filename = 'day14/demo.input2.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

// let xmax = 0;
// lines.forEach(line => {
//     if (line.substr(0, 4) === "mask") {
//         mask = line.substr(7);
//         console.log(mask)
//         let xcount = 0;
//         for (let n = 0; n < mask.length; n++) {
//             if (mask.charAt(n) === "X") xcount++;
//         }
//         xmax = Math.abs(xcount, xmax)
//     }
// })
// console.log(xmax)

//console.log(parseInt("100", 2).toString(10))
const mem = {};

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function pad(num, size) {
    while (num.length < size) num = "0" + num;
    return num;
}

function createMaskVariation(mask, pattern) {
    let result = mask;
    let ptr = 0;
    for (let n = 0; n < mask.length; n++) {
        if (mask.charAt(n) === "X") {
            result = result.replaceAt(n, pattern.charAt(ptr));
            ptr++;
        }
    }
    return result;
}

function createMaskVariations(mask) {
    const variations = [];
    let xcount = "";
    for (let n = 0; n < mask.length; n++) {
        if (mask.charAt(n) === "X") {
            xcount += "1";
        }
    }
    console.log(xcount)
    console.log(parseInt(xcount, 2))
    let xcount_len = xcount.length;
    let xcount_dec = parseInt(xcount, 2);
    for (let n = 0; n <= xcount_dec; n++) {
        variations.push(createMaskVariation(mask, pad(n.toString(2), xcount_len)))
    }
    return variations;
}

function apply(mask, value_bin) {
    let result = value_bin;

    for (let n = 0; n < 36; n++) {
        if (mask.charAt(n) === "1") {
            result = result.replaceAt(n, mask.charAt(n));
        }
    }

    return result;
}
function applyMask(mask, value_bin) {
    let result = value_bin;

    for (let n = 0; n < 36; n++) {
        if (mask.charAt(n) === "X") {
            result = result.replaceAt(n, "X");
        } else if (mask.charAt(n) === "1") {
            result = result.replaceAt(n, "1");
        }
    }

    return result;
}
function writeMem(mask, pos, value) {
    let pos_value = pos.substr(4, pos.length - 5);
    let value_bin = pad(parseInt(pos_value, 10).toString(2), 36);
    let newMask = applyMask(mask, value_bin);

    createMaskVariations(newMask).forEach(variation => {
        let target_addr = parseInt(variation, 2);
        mem[target_addr] = parseInt(value);
    });
}

let mask;
lines.forEach(line => {
    if (line.substr(0, 4) === "mask") {
        mask = line.substr(7);
    } else {
        const [pos, value] = line.split(" = ")
        writeMem(mask, pos, value)
    }
})

const reducer = (accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10);
console.log("Result: ", Object.values(mem).reduce(reducer))