const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const times = lines[0].split('Time:')[1].trim().split(/\s+/).join('');
const records = lines[1].split('Distance:')[1].trim().split(/\s+/).join('');

let possibleRecordAttempts = 0;
new Array(Number(times) + 1).fill().forEach((_, scenarioIndex) => {
    const timeRemaining = Number(times) - scenarioIndex
    const distanceTraveled = timeRemaining * scenarioIndex

    if (distanceTraveled > Number(records)) {
        possibleRecordAttempts++;
    }
    console.log(scenarioIndex, distanceTraveled)
})

console.log('possibleRecordAttempts', possibleRecordAttempts)
// console.log(times, records)
// console.log('result: ', result)