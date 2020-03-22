const constants = require('../helper/constants');
const mustache = require("mustache");
const fs = require('fs');
const mjml2html = require('mjml');

class Mail {

    constructor(to, subject) {
        this.from = constants.mailer.from;
        this.to = to;
        this.subject = subject;
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

}

module.exports = Mail;