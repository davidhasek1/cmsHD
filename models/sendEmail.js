const nodemailer = require('nodemailer');

const cmsSendMsg = class SendMail {
	constructor(email, subject, text) {
		this.email = email;
		this.subject = subject;
		this.text = text;
	}

	static resetPassword(email, token) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: '', //UŽIVATELOVI UDAJE K MAILU
				pass: ''
			}
		});
		const mailOption = {
			from: '',
			to: email,
			subject: 'Reset Password',
			html: `<p>Through link down below you reset your password</p><br>
			       <a href='http://localhost:4000/reset/${token}'>Reset</a>`
		};
		transporter.sendMail(mailOption, (err, info) => {
			if (info) {
				console.log('Reset password email successfully sent to ' + email);
			} else {
				throw err;
			}
		});
	}

	send() {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: '', //UŽIVATELOVI UDAJE K MAILU
				pass: ''
			}
		});
		const mailOption = {
			from: '',
			to: this.email,
			subject: this.subject,
			text: this.text
		};

		transporter.sendMail(mailOption, (err, info) => {
			if (info) {
				console.log('Email SENT successfully to ' + this.email);
			} else {
				throw err;
			}
		});
	}
};

const sendToMe = class MailFromForm {
	constructor(name, email, msg) {
		this.name = name;
		this.email = email;
		this.msg = msg;
	}

	sendMailFromForm() {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: '', //UŽIVATELOVI UDAJE K MAILU
				pass: ''
			}
		});
		const mailOption = {
			from: 'hasek.david1@gmail.com', //posláno od sebe
			to: 'hasek.david1@gmail.com', // pro sebe
			subject: `Message from ${this.name}, ${this.email}`,
			text: this.msg
		};

		transporter.sendMail(mailOption, (err, info) => {
			if (info) {
				console.log('New message from contact form RECIEVED');
			} else {
				throw err;
			}
		});
	}
};

exports.cmsSendMsg = cmsSendMsg;
exports.mailFromForm = sendToMe;