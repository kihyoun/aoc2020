const fs = require('fs');
const filename = 'day06/input.webarchive'
// const filename = 'day06/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");
const groups = [];
let currentGroup = [];

lines.forEach(line => {
    if (line.length > 0) currentGroup.push(line);
    if (line.length === 0) {
        groups.push(currentGroup);
        currentGroup = [];
    }
});

if (currentGroup.length > 0) groups.push(currentGroup);

const groupsSorted = [];

groups.forEach(group => {
    const newGroup = [];
    for (let k = 0; k < group.length; k++) {
        const person = group[k];
        const personArr = [];

        for (let i = 0; i < person.length; i++) {
            personArr.push(person.substring(i, i + 1));
        }

        const personSorted = personArr.sort();
        newGroup.push(personSorted);
    }

    groupsSorted.push(newGroup);
});

let sum = 0;

groupsSorted.forEach(group => {
    let shortest = undefined;

    group.forEach(personSorted => {
        if (typeof shortest === "undefined" || shortest.length > personSorted.length) {
            shortest = personSorted;
        }
    });

    let common = 0;

    shortest.forEach(needle => {
        if (group.every(haystack => {
            return typeof haystack.find(compare => compare === needle) !== "undefined";
        })) {
            common++;
        }
    });

    sum += common;
});

console.log(sum) //2290 too low