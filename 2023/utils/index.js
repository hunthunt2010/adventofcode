const fs = require('fs');

module.exports = {
    readLines: (fileName) => {
        const input = fs.readFileSync( fileName, { encoding: 'utf8', flag: 'r' } );

        return input.split('\n').filter(l => l.length);
    }
}