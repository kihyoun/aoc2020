
// const input = "0,3,6" // the 30000000th number spoken is 175594.
// const input = "1,3,2" // the 30000000th number spoken is 2578.
// const input = "2,1,3" // the 30000000th number spoken is 3544142.
// const input = "1,2,3" // the 30000000th number spoken is 261214.
// const input = "2,3,1" // the 30000000th number spoken is 6895259.
// const input = "3,2,1" // the 30000000th number spoken is 18.
// const input = "3,1,2" // the 30000000th number spoken is 362.

const input = '0,13,16,17,1,10,6';

const spoken = input.split(",").map(char => parseInt(char, 10));
const mem = new Map();

for (let n = 0; n < spoken.length; n++) {
    const num = spoken[n];
    if (!mem.has(num)) {
        mem.set(num, []);
    }
    mem.get(num).push(n);
}
console.log(mem)

for (let n = spoken.length; n < 30000000; n++) {
    let last = spoken[n - 1];
    let next;

    if (mem.has(last) && mem.get(last).length > 1) {
        const turns = mem.get(last);
        next = turns[turns.length - 1] - turns[turns.length - 2];
    } else {
        next = -1;
    }

    // console.log("\nTurn:", n + 1)
    // console.log("Original: ", spoken)
    // console.log("last spoken", last)
    // console.log("mem", mem)
    if (next === -1) {
        // console.log("first spoken (next 0)")
        spoken.push(0);
        if (!mem.has(0)) {
            mem.set(0, [n]);
        } else {
            mem.get(0).push(n);
        }
        continue;
    }

    spoken.push(next);

    // console.log("Next in queue:", next)
    if (!mem.has(next)) {
        mem.set(next, [n]);
    } else {
        mem.get(next).push(n);
    }
}
console.log(spoken[spoken.length - 1])