const express = require('express');

const { create, Login } = require('../controllers/usersController');

const {
	validationEmptyBody,
	validationCPF,
} = require('../middlewares/bodyValidation');

// const jwtValidation = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', validationEmptyBody, validationCPF, create);

router.post('/login', validationEmptyBody, validationCPF, Login);

module.exports = router;
