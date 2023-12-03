const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const adjacent = (numberInfo, symbolInfo) => {
    const x0 = numberInfo.x - 1
    const x1 = numberInfo.x + numberInfo.symbol.length
    const y0 = numberInfo.y - 1
    const y1 = numberInfo.y + 1
    return symbolInfo.x >= x0 && symbolInfo.x <= x1 && symbolInfo.y >= y0 && symbolInfo.y <= y1
  }
  
const parse = (lines) => {
    const entities = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (const match of line.matchAll(/\d+/g)) {
            entities.push({ type: 'number', x: match.index, y: i, symbol: match[0], value: Number(match[0]) })
        }

        for (const match of line.matchAll(/[^0-9\.]/g)) {
            entities.push({ type: 'symbol', x: match.index, y: i, symbol: match[0] })
        }
    }
    return entities
}
  
const entities = parse(lines)
const numbers = entities.filter(e => e.type === 'number')
const symbols = entities.filter(e => e.type === 'symbol')

console.log(numbers, symbols)
const sum = symbols
    .filter(s => s.symbol === '*')
    .map(s => {
        const adjacentNumbers = numbers.filter(n => adjacent(n, s)).map(n => n.value)
        return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0
    })
    .reduce((a, b) => a + b, 0)

console.log('sum: ', sum)