const { createUser, findByCPF } = require('../models/usersModel');
const { cpf } = require('cpf-cnpj-validator');

/* Criação de um cliente */
const creatUser = async (name, CPF) => {
	/* Formatação do CPF paro o padrão XXX.XXX.XXX-XX */
	const formatedCPF = cpf.format(CPF);

	const user = { name, cpf: formatedCPF };

	const isExist = await findByCPF(formatedCPF);

	const err = { err: { message: 'user exist' } };
	if (isExist) return err;

	const newUser = await createUser(user);
	const response = { user: newUser };

	return response;
};

/* Login de um cliente */
const login = async (CPF) => {
	const formatedCPF = cpf.format(CPF);
	const User = await findByCPF(formatedCPF);

	const err = { err: { message: 'user not exist' } };
	if (!User) return err;

	return User;
};

module.exports = {
	creatUser,
	login,
};
