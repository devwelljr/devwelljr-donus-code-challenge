const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'missing auth token' });
	}

	try {
		const { cpf } = jwt.verify(token, process.env.SECRET);

		const user = await userModel.findByCPF(cpf);

		if (!user) {
			return res
				.status(401)
				.json({ message: 'jwt malformed' });
		}

		const { _id } = user;

		req.user = { _id };

		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
