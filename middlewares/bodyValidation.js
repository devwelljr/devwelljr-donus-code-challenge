const { validator } = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator);
const { cpf } = require('cpf-cnpj-validator');
const { findByCPF } = require('../models/usersModel');

/* Schemas para validação com Joi: https://www.npmjs.com/package/@hapi/joi */
const bodySchema = Joi.object().keys({
	name: Joi.string().min(3).required(),
	cpf: Joi.string().min(11).required(),
});
const depositSchema = Joi.object().keys({
	value: Joi.number().min(1).max(2000).required(),
	beneficiary: Joi.string().min(11).required(),
});
const transferSchema = Joi.object().keys({
	value: Joi.number().min(1).required(),
	beneficiary: Joi.string().min(11).required(),
});
const cpfSchema = Joi.document().cpf();

/* Validação de tipo e tamanho do body*/
const validationEmptyBody = async (req, res, next) => {
	const { error } = bodySchema.validate(req.body);

	if (error) {
		return res.status(400).send({
			message: error.message,
		});
	}

	next();
};

/* Validação de CPF usando a biblioteca: https://www.npmjs.com/package/cpf-cnpj-validator */
const validationCPF = async (req, res, next) => {
	const { cpf } = req.body;
	const { error } = cpfSchema.validate(cpf);

	if (error) {
		return res.status(400).send({
			message: error.message,
		});
	}

	next();
};

/* Validação de tipo e tamanho do body e se o valor do deposito é menor que 2000 */
const validationDeposit = async (req, res, next) => {
	const { value, beneficiary } = req.body;
	const formatedCPF = cpf.format(beneficiary);

	const { error } = transferSchema.validate({ value, beneficiary });
	if (error) {
		return res.status(400).send({
			message: error.message,
		});
	}

	/* Valida se existe uma conta pra receber o depósito */
	const beneficiaryExists = await findByCPF(formatedCPF);
	const err = { err: { message: 'Beneficiary not exist' } };
	if (!beneficiaryExists) {
		return res.status(404).send(err);
	}

	next();
};

/* Validação de tipo e tamanho do body */
const validationTransfer = async (req, res, next) => {
	const { user: { current } } = req;
	const { value, beneficiary } = req.body;
	const formatedCPF = cpf.format(beneficiary);

	const { error } = depositSchema.validate({ value, beneficiary });
	if (error) {
		return res.status(400).send({
			message: error.message,
		});
	}

	/* Valida se existe uma conta pra receber a transferência */
	const beneficiaryExists = await findByCPF(formatedCPF);
	const err = { err: { message: 'Beneficiary not exist' } };
	if (!beneficiaryExists) {
		return res.status(404).send(err);
	}

	/* Valida se existe dinheiro na conta pra fazer a transferência */
	const erro = { err: { message: 'You dont have balance for the transfer' } };
	if (current < value) {
		return res.status(404).send(erro);
	}

	next();
};

module.exports = {
	validationEmptyBody,
	validationCPF,
	validationDeposit,
	validationTransfer,
};
