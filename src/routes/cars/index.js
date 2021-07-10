const express = require('express');
const router = express.Router();

router.get('/bestOptionsPerYear/:year', (req, res) => {
    try {
        
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
