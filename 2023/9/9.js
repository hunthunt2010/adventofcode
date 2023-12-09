const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const buildNextRow = (row, pyramid) => {
    console.log(row)
    const nextRow = [];
    for (let i = 0; i < row.length; i++) {
        if (row[i + 1] === undefined) {
            break;
        }
        nextRow.push(row[i + 1] - row[i])
    }
    // console.log('nextRow', nextRow)

    if (nextRow.length) {
        pyramid.push(nextRow)
    }

    if (nextRow.every(r => r === 0)) {
        return nextRow
    }
    return buildNextRow(nextRow, pyramid)
}

const extrapolate = (row, rowIndex, pyramid) => {
    const nextRow = pyramid[rowIndex + 1]
    // console.log('??', row, row[row.length - 1], nextRow, [row.length - 1], row[row.length - 1] + nextRow[nextRow.length - 1])
    if (pyramid[rowIndex + 1] === undefined) {
        return pyramid
    }

    pyramid[rowIndex + 1].push(row[row.length - 1] + nextRow[nextRow.length - 1])
    return extrapolate(pyramid[rowIndex + 1], rowIndex + 1, pyramid)
}

const sum = lines.reduce((acc, line) => {
    const numbers = line.split(/\s+/).map(l => Number(l)).reverse()
    const pyramid = [[...numbers]];
    console.log('pyramid', pyramid)

    buildNextRow(pyramid[0], pyramid)
    console.table(pyramid)

    const finalPyramid = extrapolate(pyramid.reverse()[0], 0, pyramid)
    console.table(finalPyramid)
    const lastRow = finalPyramid[finalPyramid.length - 1]
    const nextInSeq = lastRow[lastRow.length - 1]
    console.log('nextInSeq', nextInSeq)

    acc = acc + nextInSeq
    return acc
}, 0)

console.log('sum', sum)