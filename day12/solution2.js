const fs = require('fs');
// const matlib = require('./matlib.js');
// const filename = 'day12/input.webarchive'
const filename = 'day12/demo.input.webarchive'
const file = fs.readFileSync(filename, 'utf8');
console.log('OK:');
const lines = file.split("\n");

let w0x = 10, w0y = 1;
let wx = 10, wy = 1;
let sx = 0, sy = 0;

lines.forEach(line => {
    const cmd = line.substring(0, 1);
    const value = parseInt(line.substring(1, line.length), 10);
    switch (cmd) {
        case "N": // move the waypoint north by the given value.
            wy += value; w0y += value;
            break;
        case "S": // move the waypoint south by the given value.
            wy -= value; w0y -= value;
            break;
        case "E": // move the waypoint east by the given value.
            wx += value; w0x += value;
            break;
        case "W": // move the waypoint west by the given value
            wx -= value; w0x -= value;
            break;
        case "L":
        case "R":
            // rotate the waypoint around the ship right
            // (clockwise) the given number of degrees
            let w1x = wx - sx;
            let w1y = wy - sy;
            let w2x, w2y;
            // x = x cos a - y sin a
            // y = x sin a + y cos a
            if ((cmd === "R" && value === 90 )|| (cmd === "L" && value === 270)) {
                // w1x * cos 90 - w1y * sin 90
                // w1x * sin a + w1y * cos 90
                w2x = w1y;
                w2y = (-1) * w1x;
            }
            if ((cmd === "R" && value === 180) || (cmd === "L" && value === 180)) {
                w2x = (-1) * w1x; // w1x * cos 180 - w1y * sin 180
                w2y = (-1) * w1y; // w1x * sin 180 + w1y * cos 180
            }
            if ((cmd === "R" && value === 270) || (cmd === "L" && value === 90)) {
                w2x = w1y;// w1x * cos 270 - w1y * sin 270
                w2y = w1x;// w1x * sin 270 + w1y * cos 270
            }
            w0x = w2x;
            w0y = w2y;
            wx = w2x + sx;
            wy = w2y + sy;
            break;
        case "F":
            // move forward to the waypoint a number of times
            // equal to the given value.
            for (let n = 0; n < value; n++) {
                sx = wx; sy = wy;
                wx = sx + w0x;
                wy = sy + w0y;
            }
            break;
    }
    console.log(sx, sy, wx, wy)
})
console.log("Manhatten: ", Math.abs(sx) + Math.abs(sy))