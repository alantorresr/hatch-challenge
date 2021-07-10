const express = require('express');
const router = express.Router();

router.use('/cars', require('./cars'));

module.exports = router;
