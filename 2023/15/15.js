const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const calculateHash = (text) => {
    let hash = 0;
    [...text].forEach(char => {
        const asciiCode = char.charCodeAt(0);
        hash = ((asciiCode + hash) * 17) % 256;
    })
    return hash
}

const boxes = lines.reduce((acc, line) => {
    const parts = line.split(',')
    console.log(line)
    parts.forEach(part => {
        const matcher = /=|-/
        const operation = part.match(matcher)[0][0]
        const operationParts = part.split(/=|-/)
        const label = operationParts[0]
        const focal = operationParts[1]
        console.log(part, operation, label, focal)
        let hash = calculateHash(label);
        console.log(hash)

        if (acc[hash]) {
            if (operation === '-') {
                acc[hash] = acc[hash].filter(lens => lens.label !== label)
            }
            if (operation === '=') {
                const existingFocalIndex = acc[hash].findIndex(lens => lens.label === label);
                if (existingFocalIndex > -1) {
                    acc[hash][existingFocalIndex] = {label, focal}
                } else {
                    acc[hash].push({label, focal})
                }
            }
        } else {
            if (operation === '=') {
                acc[hash] = [{label, focal}]
            }
        }
    })

    return acc;
}, {})

const sum = Object.keys(boxes).reduce((acc, box) => {
    boxes[box].forEach((b, index) => {
        acc += (Number(box) + 1) * (index + 1) * b.focal;
    })
    
    return acc;
}, 0)

console.log('output: ', boxes, sum)