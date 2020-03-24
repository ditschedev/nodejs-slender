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
    },
    posts: {
        create: {
            title: Joi.string()
                    .min(4)
                    .required(),
            description: Joi.string()
                            .min(1)
                            .max(32)
                            .required(),
            body: Joi.string()
                    .min(1)
                    .required()
        },
        update: {
            id: Joi.string()
                    .required(),
            title: Joi.string()
                    .min(4)
                    .required(),
            description: Joi.string()
                            .min(1)
                            .max(32)
                            .required(),
            body: Joi.string()
                    .min(1)
                    .required(),
            isPublished: Joi.boolean()
                            .default(false)
        }
    }
}