const fs = require('fs');
const filename = 'day12/input.webarchive'
// const filename = 'day12/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

let direction = 'E';
const directions_N = ["N", "E", "S", "W"];
const directions_E = ["E", "S", "W", "N"];
const directions_S = ["S", "W", "N", "E"];
const directions_W = ["W", "N", "E", "S",];
let east = 0;
let north = 0;
let south = 0;
let west = 0;

const rotate = (degree, counter) => {
    const sum = counter ? 360 : 0;
    let idx = 0;
    switch (direction) {
        case "N": idx = (Math.abs(sum - degree) / 90); direction = directions_N[idx]; break;
        case "E": idx = (Math.abs(sum - degree) / 90); direction = directions_E[idx]; break;
        case "S": idx = (Math.abs(sum - degree) / 90); direction = directions_S[idx]; break;
        case "W": idx = (Math.abs(sum - degree) / 90); direction = directions_W[idx]; break;
    }
}

lines.forEach(line => {
    const cmd = line.substring(0, 1);
    const value = parseInt(line.substring(1, line.length), 10);
    switch (cmd) {
        case "N": // means to move north by the given value.
            north += value;
            console.log(`facing ${direction}, moving north ${value}`)
            break;
        case "S": // means to move south by the given value.
            south += value;
            console.log(`facing ${direction}, moving south ${value}`)
            break;
        case "E": // means to move east by the given value.
            east += value;
            console.log(`facing ${direction}, moving east ${value}`)
            break;
        case "W": // means to move west by the given value.
            west += value;
            console.log(`facing ${direction}, moving west ${value}`)
            break;
        case "L": // means to turn left the given number of degrees.
            console.log(`facing ${direction}, rotate ${value} left`)
            rotate(value, true);
            console.log(`new direction ${direction}`)
            break;
        case "R": // means to turn right the given number of degrees
            console.log(`facing ${direction}, rotate ${value} right`)
            rotate(value, false);
            console.log(`new direction ${direction}`)
            break;
        case "F": // means to move forward by the given value in the direction 
            console.log(`facing ${direction}, move ${value} forward`)
            switch (direction) {
                case "N": north += value; break;
                case "E": east += value; break;
                case "S": south += value; break;
                case "W": west += value; break;
            }
            break;
    }
})

console.log("Manhatten: ", Math.abs(north - south) + Math.abs(east - west))
