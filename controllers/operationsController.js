const rescue = require('express-rescue');
const { deposit, transfer } = require('../services/operationsService');

/* Depósito de um cliente */
const Deposit = rescue(async (req, res) => {
	const { value, beneficiary } = req.body;

	const newDeposit = await deposit(value, beneficiary);

	return res.status(200).send(newDeposit);
});

/* Transferência de um cliente */
const Transfer = rescue(async (req, res) => {
	const { user: { cpf, name } } = req;
	const { value, beneficiary } = req.body;
	const payer = { cpf, name };

	const newTransfer = await transfer(value, beneficiary, payer);

	return res.status(200).send(newTransfer);
});

/* Saldo de um cliente */
const Current = rescue(async (req, res) => {
	const { user: { current } } = req;

	const currenT = `Seu saldo atual é de R$${current.toFixed(2)}.`;

	return res.status(200).send(currenT);
});

module.exports = { Deposit, Transfer, Current };
