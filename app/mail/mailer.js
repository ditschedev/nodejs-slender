const nodemailer = require("nodemailer");

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

exports.send = function(to, subject, html, from = process.env.EMAIL_FROM) {
    return transporter.sendMail({
		from: from,
		to: to,
		subject: subject, 
		html: html
	});
}