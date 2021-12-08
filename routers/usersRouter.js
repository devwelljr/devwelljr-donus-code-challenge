const express = require('express');

const { create, login } = require('../controllers/usersController');

const {
	validationEmptyBody,
	validationCPF,
} = require('../middlewares/bodyValidation');

// const jwtValidation = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validationEmptyBody, validationCPF, create);

router.post('/login', validationEmptyBody, validationCPF, login);

module.exports = router;
