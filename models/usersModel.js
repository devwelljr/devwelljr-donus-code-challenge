const connection = require('./connection');

const findByCPF = async (cpf) => {
	const db = await connection();

	const userByCPF = await db.collection('users').findOne({ cpf });

	return userByCPF;
};

const createUser = async (user) => {
	const db = await connection();
	const { name, cpf } = user;

	await db.collection('users').insertOne({ cpf, name });

	const response = await findByCPF(cpf);

	return response;
};

module.exports = {
	findByCPF,
	createUser,
}; 
