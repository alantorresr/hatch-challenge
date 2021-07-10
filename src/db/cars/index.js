const quotes = require('./quotes.json');

class DbCars {
    constructor() {}

    getCarsQuotes() {
        return quotes;
    }
}

module.exports = DbCars;
