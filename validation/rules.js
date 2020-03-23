const Joi = require('joi');

module.exports = {
    auth: {
        create: {
            firstName: Joi.string()
                        .alphanum()
                        .min(1)
                        .required(),
            lastName: Joi.string()
                        .alphanum()
                        .min(1)
                        .required(),
            email: Joi.string()
                        .min(1)
                        .email()
                        .required(),
            password: Joi.string()
                        .min(6)
                        .required()
        }
    }
}