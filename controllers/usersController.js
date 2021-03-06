require('dotenv').config();
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { creatUser, login } = require('../services/usersService');

/* Criação de um cliente */
const create = rescue(async (req, res) => {
	const { name, cpf } = req.body;

	const newUser = await creatUser(name, cpf);

	if (newUser.err) {
		return res.status(406).send(newUser.err);
	}

	return res.status(201).send(newUser);
});

/* Login de um cliente */
const Login = rescue(async (req, res) => {
	const { cpf } = req.body;

	const User = await login(cpf);

	if (User.err) {
		return res.status(406).send(User.err);
	}

	const { _id } = User;

	/* Gera token JWT */
	const payload = { _id, cpf };
	const token = jwt.sign(payload, process.env.SECRET);

	res.status(200).send(`Seu token para autorizar operações: ${ token }`);
});

module.exports = { create, Login };
