const User = require('../../model/User');
const Joi = require('joi');
const RestResponse = require('../response/RestResponse');
const validate = require('../../validation/rules');
const validator = require('../middleware/validator');
const bcrypt = require("bcrypt");
const { randomString, generateLink } = require('../../helper/utils');
const Mail = require('../../mail/Mail');
const rules = require('../../validation/rules');

exports.register = [
    validator(rules.auth.create),
    (req, res) => {
        try {
            User.findOne({email: req.body.email}).then((user) => {
                if(user) return RestResponse.invalidData(res, "Invalid data", "The email is already registered");

                bcrypt.hash(req.body.password,10,function(err, hash) {
                    let key = randomString(16);
                    var user = new User(
                        {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            confirmKey: key
                        }
                    );
                    let mail = new Mail(req.body.email, 'Confirm your account');
                    mail.render('confirm', {
                        user: req.body.firstName,
                        url: generateLink('/confirm/' + key)
                    });
                    mail.send();
                    user.save(function (err) {
                        if (err) { return RestResponse.error(res, err); }
                        return RestResponse.successData(res,"Registration Success.", user.toJSON());
                    });
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];