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

    getQuoteCar(brand, year, hasAC) {
        return [
            getCarQuote(brand, year, hasAC, 'RC'),
            getCarQuote(brand, year, hasAC, 'Low'),
            getCarQuote(brand, year, hasAC, 'Mid'),
            getCarQuote(brand, year, hasAC, 'High'),
        ]
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

        if(currentQuote < lowestPrice || lowestPrice === 0) {
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

const getCarQuote = (brand, year, hasAC, coverageType) => {
    const carsDb = new DbCars();
    const quotes = carsDb.getCarsQuotes();
    let validQuotes = [];
    for (const quote of quotes) {
        // Validate car brand, car year range
        if (isEqualBrand(quote, brand) && isValidCarRange(quote.yearRange, year) && quote.coverageType === coverageType) {
            validQuotes.push(quote);
        }
    }

    let lowestQuote = {};

    for (const q of validQuotes) {
        let lowestPrice = 0;
        if (hasAC) {
            let sum = parseFloat(q.price.replace(",", "")) + parseFloat(q.extraCoveragePrice.replace(",", ""));
            if(sum < lowestPrice || lowestPrice === 0) {
                lowestPrice = sum;
                lowestQuote = q;
            }
        } else {
            let currentQuote = parseFloat(q.price.replace(",", ""));
            if(currentQuote < lowestPrice || lowestPrice === 0) {
                lowestPrice = currentQuote;
                lowestQuote = q;
            }
        }
    }
    
    return lowestQuote;
}

const isEqualBrand = (quote, brand) => {
    if (quote.brand.toLowerCase() === brand.toLowerCase()) {
        return true
    } else {
        return false
    }
}

module.exports = CarsController;
