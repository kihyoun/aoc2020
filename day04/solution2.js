const fs = require('fs');
// const filename = 'day04/demo.input.invalid'
// const filename = 'day04/demo.input.valid'
// const filename = 'day04/demo.input.webarchive'
const filename = 'day04/input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const passports = file.split("\n\n");
const expected = [
    ["byr", /^((19[2-9][0-9])|([2]00[0-2]))$/],
    ["iyr", /^20((1[0-9])|(20))$/],
    ["eyr", /^20((2[0-9])|(30))$/],
    ["hgt", /^((1(([5-8][0-9])|(9[0-3]))cm)|(((59)|(6[0-9])|(7[0-6]))in))$/],
    ["hcl", /^(#([0-9]|[a-f]){6})$/],
    ["ecl", /^((amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth))$/],
    ["pid", /^[0-9]{9}$/],
];

let validPassports = 0;

passports.forEach(passport => {
    const fields = passport.split('\n').join(" ").split(' ');

    if (expected.every(data => {
        const [cap, regexStr] = data;
        const regex = new RegExp(regexStr);
        return typeof fields.find(field => {
            const [caption, value] = field.split(":");

            return caption === cap && regex.test(value);
        }) !== "undefined";
    })) {
        validPassports++;
    }
});

console.log(validPassports)
