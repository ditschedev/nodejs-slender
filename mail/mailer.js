const nodemailer = require("nodemailer");
const constants = require('../helper/constants');

// Mailing transporter
let transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SMTP_HOST,
	port: process.env.EMAIL_SMTP_PORT,
	secure: process.env.EMAIL_SMTP_SECURE,
	auth: {
		user: process.env.EMAIL_SMTP_USERNAME,
		pass: process.env.EMAIL_SMTP_PASSWORD
	}
});


exports.send = function(to, subject, html) {
    return transporter.sendMail({
		from: constants.mailer.from,
		to: to,
		subject: subject, 
		html: html
	});
}

exports.send = function(from, to, subject, html) {
    return transporter.sendMail({
		from: from,
		to: to,
		subject: subject, 
		html: html
	});
}

exports.send = function(mail) {

    return transporter.sendMail({
		from: mail.from,
		to: mail.to,
		subject: mail.subject, 
		html: mail.html
	});

}