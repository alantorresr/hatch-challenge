const express = require('express');
const router = express.Router();
const CarsController = require('../../controllers/cars');

router.get('/bestOptionsPerYear/:year', (req, res) => {
    try {
        const { year } = req.params;
        let carsController = new CarsController();
        res.json(carsController.getBestOptionPerYear(parseInt(year)));
    } catch (error) {
        console.error(`[Error: ${error.message}]`);
        if (error && error.statusCode) {
            res.status(error.statusCode).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }
    }
});

router.post('/quoteCar', (req, res) => {
    try {
        const { brand, year, hasAC } = req.params;
    } catch (error) {
        console.error(`[Error: ${error.message}]`);
        if (error && error.statusCode) {
            res.status(error.statusCode).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message });
        }
    }
});

module.exports = router;
