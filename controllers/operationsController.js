const { deposit } = require('../services/operationsService');

/* Depósito de um cliente */
const Deposit = async (req, res) => {
	const { value, beneficiary } = req.body;

	const newDeposit = await deposit(value, beneficiary);

	return res.status(200).send(newDeposit);
};

module.exports = { Deposit };
