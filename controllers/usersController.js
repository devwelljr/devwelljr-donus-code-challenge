require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/usersService');

const create = async (req, res) => {
	const { name, cpf } = req.body;

	const newUser = await userService.creatUser(name, cpf);

	if (newUser.err) {
		return res.status(406).send(newUser.err);
	}

	return res.status(201).send(newUser);
};

const login = async (req, res) => {
	const { cpf } = req.body;

	const User = await userService.login(cpf);

	if (User.err) {
		return res.status(406).send(User.err);
	}

	const { _id } = User;

	const payload = { _id, cpf };

	const token = jwt.sign(payload, process.env.SECRET);

	res.status(200).send(`Your token for authorization: ${ token }`);
};

module.exports = { create, login };
