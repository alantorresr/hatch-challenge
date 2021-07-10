const DbCars = require('../../db/cars');

class CarsController {
    constructor() { };

    getBestOptionPerYear(year) {
        // Selecting the best options
        return {
            rc: getBestOption(year, 'RC'),
            low: getBestOption(year, 'Low'),
            mid: getBestOption(year, 'Mid'),
            high: getBestOption(year, 'High')
        }
    }

}

const getBestOption = (year, coverageType) => {
    const carsDb = new DbCars();
    const quotes = carsDb.getCarsQuotes();
    let validQuotes = [];
    for (const quote of quotes) {
        // Validate car brand, company availability, car year range
        if (isValidCarType(quote.brand) && isCompanyAvailable(quote.company) && isValidCarRange(quote.yearRange, year) && quote.coverageType === coverageType) {
            validQuotes.push(quote);
        }
    }

    let lowestQuote = {};

    for (const q of validQuotes) {
        let lowestPrice = 0;
        let currentQuote = parseFloat(q.price.replace(",", ""));

        if (lowestPrice === 0) {
            lowestPrice = currentQuote;
            lowestQuote = q;
        } else if(currentQuote < lowestPrice) {
            lowestPrice = currentQuote;
            lowestQuote = q;
        }
    }
    
    return lowestQuote;
}

const isValidCarType = (carBrand) => {
    const VALID_CAR_BRANDS = {
        Chevrolet: true,
        Dodge: true,
        Ford: true,
        GMC : true,
        Honda: true
    }
    return VALID_CAR_BRANDS[carBrand] || false
}

const isCompanyAvailable = (companyName) => {
    const VALID_COMPANIES = {
        'Seguros Atlas': true,
        Qualitas: true,
        MAPFRE: true
    }
    return VALID_COMPANIES[companyName] || false
}

const isValidCarRange = (quoteYearRange, year) => {
    if (year >= quoteYearRange[0] && year <= quoteYearRange[1]) {
        return true;
    } else {
        return false;
    }
}

module.exports = CarsController;
