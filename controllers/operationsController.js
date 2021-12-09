const { deposit, transfer } = require('../services/operationsService');

/* Depósito de um cliente */
const Deposit = async (req, res) => {
	const { value, beneficiary } = req.body;

	const newDeposit = await deposit(value, beneficiary);

	return res.status(200).send(newDeposit);
};

/* Transferência de um cliente */
const Transfer = async (req, res) => {
	const { user: { cpf, name } } = req;
	const { value, beneficiary } = req.body;
	const payer = { cpf, name };

	const newTransfer = await transfer(value, beneficiary, payer);

	return res.status(200).send(newTransfer);
};

module.exports = { Deposit, Transfer };
