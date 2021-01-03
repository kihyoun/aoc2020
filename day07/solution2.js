const fs = require('fs');
const filename = 'day07/input.webarchive'
// const filename = 'day07/demo.input.webarchive'
// const filename = 'day07/demo2.input.webarchive'
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

function countGold(bagType, level) {
    let sum = level > 0 ? 1 : 0;

    bagInfo[bagType].forEach(content => {
        const [count, ...typeArr] = content.split(" ");
        const type = typeArr.join(" ");
        if (type === "other") {
            sum += 0;
        } else {
            sum += parseInt(count, 10) * countGold(type, level + 1);
        }
    });

    return sum;
}

const total = countGold("shiny gold", 0)

console.log(total)
