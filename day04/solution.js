const fs = require('fs');
// const filename = 'day04/demo.input.webarchive'
const filename = 'day04/input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const passports = file.split("\n\n");
const expected = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
];

let validPassports = 0;

passports.forEach(passport => {
    const fields = passport.split('\n').join(" ").split(' ');

    if (expected.every(cap => {
        return typeof fields.find(field => {
            const [caption, value] = field.split(":");
            return caption === cap;
        }) !== "undefined";
    })) {
        validPassports++;
    }
});

console.log(validPassports)
