const fs = require('fs');
const filename = 'day05/input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

//const input = "FBFBBFFRLR"; //357
//const input = "BFFFBBFRRR"; //row 70, column 7, seat ID 567.
//const input = "FFFBBBFRRR"; //row 14, column 7, seat ID 119.
//const input = "BBFFBBFRLL"; //row 102, column 4, seat ID 820.

const getSeatID = (input) => {
    const row = [0, 127];
    for (let i = 0; i < 7; i++) {
        switch (input.substring(i, i + 1)) {
            case "F": row[1] = row[1] - (128 >> (i + 1)); break;
            case "B": row[0] = row[0] + (128 >> (i + 1)); break;
        }
    }

    let cols = [0, 7];

    for (let k = 0; k < 3; k++) {
        switch (input.substring(k + 7, k + 8)) {
            case "L": cols[1] = cols[1] - (8 >> (k + 1)); break;
            case "R": cols[0] = cols[0] + (8 >> (k + 1)); break;
        }
    }

    return row[0] * 8 + cols[0];
}

let maxID = 0;

lines.forEach(input => {
    maxID = Math.max(getSeatID(input), maxID);
});

console.log(maxID)