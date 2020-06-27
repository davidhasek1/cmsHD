const nodemailer = require('nodemailer');

module.exports = class SendMail {
    constructor(email, subject, text) {
        this.email = email;
        this.subject = subject;
        this.text = text;
    }

    send() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hasek.david1@gmail.com',
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
            if(info) {
                console.log('Email SENT successfully to ' + this.email);
            }
            else {
                throw err;
            }
        })
    }
}