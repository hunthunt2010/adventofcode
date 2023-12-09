const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const moves = lines[0].split('');

const map = lines.slice(1, lines.length).reduce((acc, l) => {
    const parts = l.split('=');
    const key = parts[0].trim();
    const leftRightTuple = parts[1].trim().split(',')
    const left = leftRightTuple[0].substring(1, leftRightTuple[0].length)
    const right = leftRightTuple[1].substring(0, leftRightTuple[1].length - 1).trim()

    acc[key] = {left, right}

    return acc
}, {})

let startingList = [...Object.keys(map)].filter(k => k.endsWith('A'));

const stepCounts = startingList.reduce((acc, start) => {
    let instructionIndex = 0;
    let stepCount = 0;
    
    console.log('??start', start)

    while(!(start[start.length - 1] === 'Z')) {
        const instructionForIndex = moves[instructionIndex];
        // // console.log('move', moves, map, map[currentStep], instructionForIndex, instructionIndex)
        const nextStep = instructionForIndex === 'L' ? map[start].left : map[start].right
    
        // console.log('next', nextStep)
    
        stepCount++;
        start = nextStep;
        instructionIndex = instructionIndex + 1 === moves.length ? 0 : instructionIndex + 1;
    }
    
    console.log('step count: ', stepCount);
    acc = [...acc, stepCount]
    return acc;
}, []);

console.log(stepCounts) // Take output and cheat and feed into a LCF calculator