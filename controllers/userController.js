const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const { User } = require('../database/index.js');
const userService = require('../services/userService.js');

const register = async (req, res) => {
	try {
		const filePath = path.join(__dirname, '../views/mailTemplate.ejs');
		const source = fs.readFileSync(filePath, 'utf8').toString();
		const template = ejs.compile(source);
		const transporter = await nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'thanhphat19@gmail.com',
				pass: 'Thanhphatnn@@0941992082',
			},
		});
		const { username, password, firstName, lastName, email, phone, address } = req.body;
		const replacements = {
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			address: address,
		};
		const mailTemplate = template(replacements);
		const result = await userService.register(username, password, firstName, lastName, email, phone, address);
		res.status(200).json({ message: 'Sign In successfully', result: result });
		return transporter.sendMail({
			to: [...email],
			from: 'thanhphat19@gmail.com',
			subject: 'Signup succeeded!',
			html: mailTemplate,
		});
	} catch (err) {
		throw err;
	}
};

module.exports = {
	register,
};
