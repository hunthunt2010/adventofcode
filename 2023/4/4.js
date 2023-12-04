const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

let cardCount = 0;

const processCard = (cardGameStack, gameIndex, cards) => {
    cardCount++;
    cardGameStack.forEach(cgs => {
        const winners = cgs.myNumbers.filter((n) => {
            return cgs.winningNumbers.indexOf(n) !== -1;
        });
        console.log('won tickets: ', gameIndex, winners.length)

        for (let i = 0; i < winners.length; i++) {
            console.log('adding ticket: ', gameIndex + i + 1, winners.length)
            processCard(cards[gameIndex + i + 1], gameIndex + i + 1, cards)
        }
    })
}

const cards = lines.reduce((acc, line) => {
    const lineParts = line.split(':')
    const cardNumber = lineParts[0].split('Card ')[1].trim()
    const parts = lineParts[1].trim().split('\|')
    const winningNumbers = parts[0].trim().split(' ').filter(n => !!n)
    const myNumbers = parts[1].trim().split(' ').filter(n => !!n)
    
    acc = {...acc, [Number(cardNumber) - 1]: [{cardNumber: Number(cardNumber) - 1, winningNumbers, myNumbers}]}
    return acc;
}, {});

Object.values(cards).forEach((card, index) => {
    processCard(card, index, cards)
})

console.log('cardCount: ', cardCount)