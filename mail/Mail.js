const constants = require('../helper/constants');
const mustache = require("mustache");
const mjml = require("mjml");
const fs = require('fs');

class Mail {

    constructor(to, subject) {
        this.from = constants.mailer.from;
        this.to = to;
        this.subject = subject;
    }

    render(template, data) {

        fs.readFile('./templates/' + template + ".mjml", 'utf-8', (err, mjml) => {

            if(err) {
                return console.log(err);
            }

            let rendered = mustache.render(mjml, data);

            this.html = mjml(rendered).html;

        });

    }

    setHTML(html) {
        this.html = html;
    }

    setFrom(from) {
        this.from = from;
    }

}