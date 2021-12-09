const express = require('express');

const { create, Login } = require('../controllers/usersController');

const {
	validationEmptyBody,
	validationCPF,
} = require('../middlewares/bodyValidation');

const router = express.Router();

router.post('/', validationEmptyBody, validationCPF, create);

router.post('/login', validationCPF, Login);

module.exports = router;
