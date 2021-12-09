const jwt = require('jsonwebtoken');
const { cpf } = require('cpf-cnpj-validator');
const userModel = require('../models/usersModel');

/* Validação do JWT e salva user na requisição */
module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'missing auth token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		const formatedCPF = cpf.format(decoded.cpf);


		const user = await userModel.findByCPF(formatedCPF);

		if (!user) {
			return res.status(401).json({ message: 'jwt malformed' });
		}

		req.user = user;

		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
