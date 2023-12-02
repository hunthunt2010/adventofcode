const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const config = {
    'red': 12,
    'green': 13,
    'blue': 14
}

const gameCubeMinimums = {}

const gameSum = lines.reduce((acc, line) => {
    console.log(line)
    let validGame = true;
    const gameParts = line.split(':');
    const gameNumber = Number(gameParts[0].split(' ')[1].trim());

    const gamePulls = gameParts[1].split(';');
    const minCubes = {'red': 0, 'green': 0, 'blue': 0}

    gamePulls.forEach((pull) => {
        const cubes = pull.split(',');

        cubes.forEach((cube) => {
            const cubeParts = cube.trim().split(' ')
            const numberOfCubes = Number(cubeParts[0].trim())
            const color = cubeParts[1].trim()
            
            if (numberOfCubes > config[color]) {
                validGame = false
            }

            if (numberOfCubes > minCubes[color]) {
                minCubes[color] = numberOfCubes
            }
        })
    })

    if (validGame) {
        acc += gameNumber
    }

    gameCubeMinimums[gameNumber] = minCubes

    console.log(gameCubeMinimums)
    return acc;
}, 0)

const powerSum = Object.values(gameCubeMinimums).reduce((acc, val) => {
    acc += Object.values(val).reduce((a, b)=> a * b, 1)
    return acc;
}, 0)

console.log('game id sum: ', gameSum)
console.log('power sum: ', powerSum)