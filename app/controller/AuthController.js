const User = require('../../model/User');
const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const bcrypt = require("bcrypt");
const { randomString, generateLink } = require('../../helper/utils');
const Mail = require('../../mail/Mail');
const rules = require('../../validation/rules');
const jwt = require("jsonwebtoken");

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

exports.login = [
    validator(rules.auth.login),
    (req, res) => {
        try {
            User.findOne({email: req.body.email}).then((user) => {
                if(!user) {
                    return RestResponse.unauthorized(res, "Invalid email or password");
                }

                bcrypt.compare(req.body.password, user.password, (err, same) => {
                    if(!same) return RestResponse.unauthorized(res, "Invalid email or password");
                    if(!user.isConfirmed) return RestResponse.unauthorized(res, "Account is not confirmed, please confirm your account");
                    if(!user.status) return RestResponse.unauthorized(res, "Account is not active");

                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(user.toJSON(), secret, {
                        expiresIn: process.env.JWT_TIMEOUT_DURATION
                    });

                    return RestResponse.successData(res, "Login successfull", {
                        token: token
                    });
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.verify = [
    validator(rules.auth.verify),
    (req, res) => {
        try {
            User.findOne({confirmKey: req.body.confirmKey}).then((user) => {
                if(!user) return RestResponse.unauthorized(res, 'Invalid confirmation key');
                if(user.isConfirmed) return RestResponse.success(res, "Account has already been confirmed");
                user.isConfirmed = true;
                user.save().then((user) => {
                    return RestResponse.success(res, "Account successfully confirmed");
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.resendConfirmation = [
    validator(rules.auth.resend),
    (req, res) => {
        try {
            User.findOne({email: req.body.email}).then((user) => {
                if(!user) {
                    return RestResponse.bad(res, "Invalid email address");
                }
                if(user.isConfirmed) return RestResponse.bad("Account already confirmed");
                let key = randomString(16);
                user.confirmKey = key;
                user.save().then((user) => {
                    let mail = new Mail(req.body.email, 'Confirm your account');
                    mail.render('confirm', {
                        user: req.body.firstName,
                        url: generateLink('/confirm/' + key)
                    });
                    mail.send();
                    RestResponse.success(res, "Confirmation email resent");
                }).catch((err) => {
                    RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];