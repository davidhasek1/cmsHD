const Form = require('../models/form');
const MailfromForm = require('../models/sendEmail').mailFromForm;
const Images = require('../models/images');
const { validationResult } = require('express-validator');

exports.getHomePage = async (req, res, next) => {
	try {
		const img = await Images.fetchImg();
		res.render('index', {
			pageTitle: 'Martin Bucek',
			images: img
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getContactForm = (req, res, next) => {
	const msgSent = req.flash('msgSent');
	res.render('contact-form', {
		pageTitle: 'Kontaktní formulář',
		msgStatus: msgSent[0],
		error: null
	});
};

exports.postContactForm = async (req, res, next) => {
	const name = req.body.fullname;
	const email = req.body.email;
	const message = req.body.message;
	const data = new Form(name, email, message);
	const mail = new MailfromForm(name, email, message);
	const error = validationResult(req);

	if (!error.isEmpty()) {
		return res.status(422).render('contact-form', {
			pageTitle: 'Kontaktní formulář',
			msgStatus: null,
			error: error.array()[0].msg
		});
	}

	try {
		await data.save();
		console.log('New MSG created');
		req.flash('msgSent', 'Zpráva úspěšně odeslána');
		res.redirect('/contact-form');
	} catch (error) {
		console.log(error);
	}
	/*  mail.sendMailFromForm(); */
};
