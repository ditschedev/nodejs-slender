const Joi = require('joi');

module.exports = {
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
                    .required(),
        groupId: Joi.string()
                .trim()
                .required()
    },
    update: {
        id: Joi.string()
                .required(),
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
                .required(),
        groupId: Joi.string()
                .trim()
                .required()
    }
}