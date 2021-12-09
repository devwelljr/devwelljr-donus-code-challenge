const { makeDeposit, makeTransfer } = require('../models/operationsModel');
const { cpf } = require('cpf-cnpj-validator');

/* Depósito de um cliente */
const deposit = async (value, beneficiary) => {
	/* Formatação do CPF paro o padrão XXX.XXX.XXX-XX */
	const formatedCPF = cpf.format(beneficiary);

	const newDeposit = await makeDeposit(value, formatedCPF);

	const response = `O ${newDeposit.name} recebeu um depósito de R$${value.toFixed(
		2
	)}.`;

	return response;
};

/* Transferência de um cliente */
const transfer = async (value, beneficiary, payer) => {
	/* Formatação do CPF paro o padrão XXX.XXX.XXX-XX */
	const formatedCPFB = cpf.format(beneficiary);
	const formatedCPFP = cpf.format(payer.cpf);

	const newTransfer = await makeTransfer(value, formatedCPFB, formatedCPFP);

	const response = `O ${payer.name} transferiu R$${value.toFixed(2)} para ${
		newTransfer.name
	}.`;

	return response;
};

module.exports = { deposit, transfer };
