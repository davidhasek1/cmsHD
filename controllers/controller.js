const Form = require('../models/form');
const MailfromForm = require('../models/sendEmail').mailFromForm;
const Images = require('../models/images');

exports.getHomePage = (req, res, next) => {
	Images.fetchImg()
	.then((img) => {
		res.render('index', {
		pageTitle: 'Martin Bucek',
		images: img
	});

	}).catch((err) => {
		console.log(err);	
	});

};

exports.getContactForm = (req, res, next) => {
	res.render('contact-form', {
		pageTitle: 'Kontaktní formulář'
	});
};

exports.postContactForm = (req, res, next) => {
	const name = req.body.fullname;
	const email = req.body.email;
	const message = req.body.message;
	const data = new Form(name, email, message);
	const mail = new MailfromForm(name, email, message);

	data.save()
	.then(() => {
		console.log('New MSG created');
		res.redirect('/admin/cms');
	})
  	.catch((err) => console.log(err));
        
    mail.sendMailFromForm();
};
