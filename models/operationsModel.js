const connection = require('./connection');
const { findByCPF } = require('./usersModel');

/* Depósito de um cliente */
const makeDeposit = async (value, beneficiary) => {
	const db = await connection();

	await db
		.collection('users')
		.updateOne(
			{ cpf: beneficiary },
			{ $inc: { current: value } }
		);

	const userByCPF = await findByCPF(beneficiary);

	return userByCPF;
};

/* Transferência de um cliente */
const makeTransfer = async (value, formatedCPFB, formatedCPFP) => {
	const db = await connection();

	await db
		.collection('users')
		.updateOne(
			{ cpf: formatedCPFP },
			{ $inc: { current: -value } }
		);

	const beneficiaryByCPF = await makeDeposit(value, formatedCPFB);

	return beneficiaryByCPF;
};

module.exports = { makeDeposit, makeTransfer };
