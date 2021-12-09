const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

/* Validação do JWT */
module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'missing auth token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);

		const user = await userModel.findByCPF(decoded.cpf);

		if (!user) {
			return res.status(401).json({ message: 'jwt malformed' });
		}

		req.user = user;

		next();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
