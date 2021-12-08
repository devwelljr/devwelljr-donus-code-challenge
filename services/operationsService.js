const { makeDeposit } = require('../models/operationsModel');
const { cpf } = require('cpf-cnpj-validator');

/* Depósito de um cliente */
const deposit = async (value, beneficiary) => {
	/* Formatação do CPF paro o padrão XXX.XXX.XXX-XX */
	const formatedCPF = cpf.format(beneficiary);

	const newDeposit = await makeDeposit(value, formatedCPF);

	const response = `O ${newDeposit.name} recebeu um depósito de ${value}`;

	return response;
};

module.exports = { deposit };
