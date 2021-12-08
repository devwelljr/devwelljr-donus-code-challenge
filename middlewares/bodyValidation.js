const { validator } = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator);

const bodySchema = Joi.object().keys({
	name: Joi.string().min(3).required(),
	cpf: Joi.string().min(11).required(),
});
const cpfSchema = Joi.document().cpf();

const validationEmptyBody = async (req, res, next) => {
	const { error } = bodySchema.validate(req.body);

	if (error) {
		return res.status(400).send({
			message: error.message,
		});
	}

	next();
};

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

module.exports = { validationEmptyBody, validationCPF };
