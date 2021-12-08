const { createUser, findByCPF } = require('../models/usersModel');
const { cpf } = require('cpf-cnpj-validator');

const creatUser = async (name, CPF) => {
	const formatedCPF = cpf.format(CPF);
	const user = { name, cpf: formatedCPF };

	const isExist = await findByCPF(formatedCPF);
	const err = { err: { message: 'user exist' } };

	if (isExist) return err;

	const newUser = await createUser(user);

	const response = { user: newUser };

	return response;
};

const login = async (cpf) => {
	const User = await findByCPF(cpf);
	const err = { err: { message: 'user not exist' } };

	if (!User) return err;

	return User;
};

module.exports = {
	creatUser,
	login,
};
