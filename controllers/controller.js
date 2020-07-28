const Form = require('../models/form');
const MailfromForm = require('../models/sendEmail').mailFromForm;

exports.getHomePage = (req, res, next) => {
	res.render('index', {
		pageTitle: 'Martin Bucek'
	});
};

/* nefunkční momentálně */


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
