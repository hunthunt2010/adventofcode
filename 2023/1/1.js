const fs = require('fs');

const input = fs.readFileSync( __dirname + "/input.txt", { encoding: 'utf8', flag: 'r' } );

const lines = input.split('\n');

const result = lines.reduce((acc, line) => {
    const numbers = [{name: 'zero', value: 0}, {name: 'one', value: 1}, {name: 'two', value: 2}, {name: 'three', value: 3}, {name: 'four', value: 4}, {name: 'five', value: 5}, {name: 'six', value: 6}, {name: 'seven', value: 7}, {name: 'eight', value: 8}, {name: 'nine', value: 9}];
    let lowestNumber = '';
    let lowestIndex = Infinity;

    for (let number of numbers) {
        const foundIndex = line.indexOf(number.name);
        if (foundIndex > -1 && foundIndex < lowestIndex) {
            lowestIndex = foundIndex;
            lowestNumber = number;
        }
    }

    console.log(line)
    line = line.replace(lowestNumber.name, lowestNumber.value)
    console.log(line)

    let highestNumber = '';
    let highestIndex = -1;

    for (let number of numbers) {
        const foundIndex = line.lastIndexOf(number.name);
        if (foundIndex > -1 && foundIndex > highestIndex) {
            highestIndex = foundIndex;
            highestNumber = number;
        }
    }
    console.log(line, highestIndex, highestNumber.value)
    if (highestIndex > -1) {
        line = line.substring(0, highestIndex) + highestNumber.value + line.substring(highestIndex + highestNumber.name.length, line.length)
    }
    console.log(line)

    const chars = line.split('');
    let digits = "";

    console.log('line', line)
    for(let char of chars) {
        if (!isNaN(Number(char))) {
            digits += char;
            break;
        }
    }

    for(let char of chars.reverse()) {
        if (!isNaN(Number(char))) {
            digits += char;
            break;
        }
    }

    console.log(Number(digits))
    acc = acc + Number(digits);
    return acc;
}, 0);

console.log(result);