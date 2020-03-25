const User = require('../../model/User');
const Group = require('../../model/Group');
const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const { randomString, generateLink } = require('../../helper/utils');
const Mail = require('../../mail/Mail');
const { auth } = require('../../validation/rules');
const jwt = require("jsonwebtoken");

exports.register = [
    validator(auth.create),
    (req, res) => {
        try {
            User.findOne({email: req.body.email}).then((user) => {
                if(user) return RestResponse.conflict(res, "The email is already registered");
                let key = randomString(16);
                req.body.confirmKey = key;

                var user = new User(req.body);
                Group.find({isDefault: true}).then((group) => {
                    if(!group) return RestResponse.error(res, "No default group defined");
                    user.groups.push(group);
                    user.save(function (err) {
                        if (err) { return RestResponse.error(res, err); }
                        group.users.push(user);
                        group.save(function(err) {
                            if(err) return RestResponse.error(res, err);
                            let mail = new Mail(user.email, 'Confirm your account');
                            mail.render('confirm', {
                                user: user.firstName,
                                url: generateLink('/confirm/' + key)
                            });
                            mail.send();
                            user.populate('groups').populate('roles').execPopulate().then((user) => {
                                return RestResponse.successData(res,"Registration Success.", user);
                            }).catch((err) => {
                                return RestResponse.error(res, err);
                            });
                        });
                    });
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.login = [
    validator(auth.login),
    (req, res) => {
        try {
            User.findOne({email: req.body.email}).then((user) => {
                if(!user) {
                    return RestResponse.unauthorized(res, "Invalid email or password");
                }
                user.tryLogin(req.body.password).then(() => {
                    if(!user.isConfirmed) return RestResponse.unauthorized(res, "Account is not confirmed, please confirm your account");
                    if(!user.status) return RestResponse.unauthorized(res, "Account is not active");

                    let userObj = user.toJSON();
                    userObj.roles = user.getRoles;

                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(userObj, secret, {
                        expiresIn: process.env.JWT_TIMEOUT_DURATION
                    });

                    return RestResponse.successData(res, "Login successfull", {
                        token: token
                    });
                }).catch((err) => {
                    return RestResponse.unauthorized(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.verify = [
    validator(auth.verify),
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
    validator(auth.resend),
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