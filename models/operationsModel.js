const connection = require('./connection');
const { findByCPF } = require('./usersModel');

const makeDeposit = async (value, beneficiary) => {
	const db = await connection();

	await db
		.collection('users')
		.updateOne(
			{ cpf: beneficiary },
			{ $inc: { current: value } }
		);

	const userByCPF = findByCPF(beneficiary);

	return userByCPF;
};

module.exports = { makeDeposit };
