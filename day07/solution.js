const fs = require('fs');
const filename = 'day07/input.webarchive'
// const filename = 'day07/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const bagInfoRaw = file.split("\n");

const bagInfo = {};
bagInfoRaw.forEach(info => {
    const [bagType, contentRaw] = info.split(' bags contain ');
    const content = contentRaw.replace('.', '')
        .replace(/ ,/gi, ',').replace(/, /gi, ',').replace(/ bags/gi, '')
        .replace(/ bag/gi, '').split(',');
    bagInfo[bagType] = content;
});
let callcount = 0;

function countGold(bagType, level) {
    callcount++;
    let sum = 0;

    if (!bagInfo[bagType]) {
        return 0;
    }

    bagInfo[bagType].forEach(content => {
        const [count, ...typeArr] = content.split(" ");
        const type = typeArr.join(" ");
        if (type === "shiny gold") {
            sum += parseInt(count, 10);
        } else if (type === "other") {
            sum += 0;
        } else {
            sum += parseInt(count, 10) * countGold(type, level + 1);
        }
    });

    return sum;
}

let total = 0;
let types = [];

Object.keys(bagInfo).forEach(bagType => {
    let contains = countGold(bagType, 0) > 0;
    total += contains ? 1 : 0;
    if (contains) types.push(bagType);
});

console.log(total)
console.log(callcount)
console.log(types)
