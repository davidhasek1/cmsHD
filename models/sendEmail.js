const nodemailer = require('nodemailer');

const cmsSendMsg = class SendMail {
	constructor(email, subject, text) {
		this.email = email;
		this.subject = subject;
		this.text = text;
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
			from: 'hasek.david1@gmail.com',
			to: this.email, //ABY panu Buckovi chodili zpravy i na mail, co se pošle z modalu z formuláře, tak poslat sem a poslat na mail?
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
			from: 'hasek.david1@gmail.com',
			to: 'hasek.david1@gmail.com', //ABY panu Buckovi chodili zpravy i na mail, co se pošle z modalu z formuláře, tak poslat sem a poslat na mail?
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

/* 
sendToMe() {
    //když jsme zadal svuj mail do formulaře, tak se poslalo do me schranky
    // když z formulaře odešlu zpravu
    // zprava z formu se pošle pod mojí mail adresou na muj mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hasek.david1@gmail.com',   //UŽIVATELOVI UDAJE K MAILU
            pass: 'd4v1dh4s3k'
        }
    });
    const mailOption = {
        from: 'hasek.david1@gmail.com',
        to: this.email, //ABY panu Buckovi chodili zpravy i na mail, co se pošle z modalu z formuláře, tak poslat sem a poslat na mail?
        subject: this.subject,
        text: this.text
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (info) {
            console.log('Email SENT successfully to ' + this.email);
        }
        else {
            throw err;
        }
    })
} */
