const mustache = require("mustache");
const fs = require('fs');
const mjml2html = require('mjml');
const nodemailer = require("nodemailer");

class Mail {

    constructor(to, subject) {
        this.from = process.env.EMAIL_FROM;
        this.to = to;
        this.subject = subject;

        this._init();
    }

    _init() {
        this._transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_HOST,
            port: process.env.EMAIL_SMTP_PORT,
            secure: process.env.EMAIL_SMTP_SECURE,
            auth: {
                user: process.env.EMAIL_SMTP_USERNAME,
                pass: process.env.EMAIL_SMTP_PASSWORD
            }
        });
    }

    render(template, data) {
        
        let mjml = fs.readFileSync(__dirname + '/templates/' + template + '.mjml','utf8');
        let rendered = mustache.render(mjml, data);
        this.html = mjml2html(rendered).html;
    }

    setHTML(html) {
        this.html = html;
    }

    setFrom(from) {
        this.from = from;
    }

    send() {
        return this._transporter.sendMail({
            from: this.from,
            to: this.to,
            subject: this.subject, 
            html: this.html
        });
    }

}

module.exports = Mail;