const {readLines} = require('../utils')

const lines = readLines(__dirname + "/input.txt");

const normalizeCard = (card) => {
    let normalized = card;

    if (normalized === 'A') normalized = 14;
    if (normalized === 'K') normalized = 13;
    if (normalized === 'Q') normalized = 12;
    if (normalized === 'J') normalized = 1;
    if (normalized === 'T') normalized = 10;

    return Number(normalized);
}

const isFullHouse = (matches) => {
    return (matches[0][0].length === 3 && matches[1][0].length === 2) || (matches[0][0].length === 2 && matches[1][0].length === 3);
}

const scoreHand = (hand) => {
    const matchesWithoutJack = [...hand.matchAll(/([^J])\1+/g)]
    const jacks = [...hand.matchAll(/(J)+/g)]
    if (!matchesWithoutJack.length && !jacks.length) return 1;

    if (matchesWithoutJack.length === 2) {
        if (jacks.length) {
            if (matchesWithoutJack[0][0].length === 2 && matchesWithoutJack[1][0].length === 2 && jacks.length === 1) {
                return 5; // jack makes it a full house
            }
        } else {
            if (isFullHouse(matchesWithoutJack)) return 5;
            return 3;
        }
    }

    if (matchesWithoutJack.length === 1) {
        let adjustedHandMatches = matchesWithoutJack;
        if (jacks.length) {
            const adjustedHand = hand.replaceAll('J', matchesWithoutJack[0][0][0])
            adjustedHandMatches = [...adjustedHand.matchAll(/([^])\1+/g)]
        }

        if (adjustedHandMatches[0][0].length === 5) return 7;
        if (adjustedHandMatches[0][0].length === 4) return 6;
        if (adjustedHandMatches[0][0].length === 3) return 4;
        if (adjustedHandMatches[0][0].length === 2) return 2;
    }

    if (jacks.length && jacks[0].length) {
        const numJacks = jacks[0][0].length
        return numJacks === 1 ? 2 : numJacks === 2 ? 4 : numJacks === 3 ? 6 : 7
    }
}

const handInfo = lines.reduce((acc, line) => {
    const parts = line.split(/\s+/)
    const hand = parts[0].split('');
    const bid = parts[1];

    const sortedHand = [...hand].sort((a, b) => {
        const normalizedA = normalizeCard(a);
        const normalizedB = normalizeCard(b);
        
        return normalizedA > normalizedB ? -1 : normalizedA < normalizedB ? 1 : 0;
    })

    const handScore = scoreHand(sortedHand.join(''))
    // console.log(hand, sortedHand, handScore)
    acc = [...acc, {hand, sortedHand, bid, handScore}]
    return acc;
}, [])

const sortedHands = [...handInfo].sort((a, b) => {
    if (a.handScore > b.handScore) {
        return -1;
    } else if (a.handScore < b.handScore) {
        return 1;
    } else {
        for (const [index, aCard] of a.hand.entries()) {
            if (normalizeCard(aCard) > normalizeCard(b.hand[index])) return -1;
            if (normalizeCard(aCard) < normalizeCard(b.hand[index])) return 1;
        }

        return 0;
    }
}).reverse()

let sumWinnings = 0;

for (const [index, hand] of sortedHands.entries()) {
    // console.log(hand, hand.bid, index + 1)
    sumWinnings += Number(hand.bid) * (index + 1);
}

console.log('sum winnings: ', sumWinnings)