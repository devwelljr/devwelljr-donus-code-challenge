const connection = require('./connection');

/* Busca conta por CPF */
const findByCPF = async (cpf) => {
	const db = await connection();

	const userByCPF = await db.collection('users').findOne({ cpf });

	return userByCPF;
};

/* Criação de um cliente */
const createUser = async (user) => {
	const db = await connection();
	const { name, cpf } = user;

	await db.collection('users').insertOne({ cpf, name, current: 0 });

	const response = await findByCPF(cpf);

	return response;
};

module.exports = {
	findByCPF,
	createUser,
}; 
