const Joi = require('joi');

module.exports = {
    auth: {
        create: {
            firstName: Joi.string()
                        .trim()
                        .alphanum()
                        .min(1)
                        .required(),
            lastName: Joi.string()
                        .trim()
                        .alphanum()
                        .min(1)
                        .required(),
            email: Joi.string()
                        .trim()
                        .min(1)
                        .email()
                        .required(),
            password: Joi.string()
                        .trim()
                        .min(6)
                        .required()
        },
        login: {
            email: Joi.string()
                    .trim()
                    .min(1)
                    .email()
                    .required(),
            password: Joi.string()
                        .trim()
                        .min(1)
                        .required()
        },
        verify: {
            confirmKey: Joi.string()
                        .trim()
                        .min(16)
                        .max(16)
                        .required()
        },
        resend: {
            email: Joi.string()
                    .trim()
                    .min(1)
                    .email()
                    .required()
        }
    }
}