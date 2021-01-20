// const input = "0,3,6" // the 2020th number spoken is 1.
// const input = "1,3,2" // the 2020th number spoken is 1.
// const input = "2,1,3" // the 2020th number spoken is 10.
// const input = "1,2,3" // the 2020th number spoken is 27.
// const input = "2,3,1" // the 2020th number spoken is 78.
// const input = "3,2,1" // the 2020th number spoken is 438.
// const input = "3,1,2" // the 2020th number spoken is 1836.

const input = '0,13,16,17,1,10,6';

const spoken = input.split(",").map(char => parseInt(char, 10));

for (let n = spoken.length; n < 2020; n++) {
    let spoken_reverse = spoken.slice(0, spoken.length - 1).reverse();
    let last = spoken[n - 1];
    let lastIndex = spoken_reverse.indexOf(last);
    // console.log("\nTurn:", n + 1)
    // console.log("Original: ", spoken)
    // console.log("Reverse without last: ", spoken_reverse)
    // console.log("last spoken", last)


    if (lastIndex === -1) {
        // console.log("first spoken (next 0)")
        spoken.push(0);
        continue;
    }

    // console.log("spoken in turn", spoken_reverse.length - lastIndex)
    let next = n - spoken_reverse.length + lastIndex;
    // console.log("Next in queue:", next)
    spoken.push(next)
}
console.log(spoken[spoken.length - 1])