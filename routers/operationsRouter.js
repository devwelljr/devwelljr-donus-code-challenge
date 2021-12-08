const express = require('express');

const { Deposit } = require('../controllers/operationsController');

const jwtValidation = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/deposit', jwtValidation, Deposit);

module.exports = router;
