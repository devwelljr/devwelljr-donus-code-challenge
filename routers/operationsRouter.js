const express = require('express');

const { Deposit, Transfer } = require('../controllers/operationsController');

const jwtValidation = require('../middlewares/jwtValidation');

const { validationDeposit, validationTransfer } = require('../middlewares/bodyValidation');

const router = express.Router();

router.post('/deposit', jwtValidation, validationDeposit, Deposit);

router.put('/transfer', jwtValidation, validationTransfer, Transfer);

module.exports = router;
