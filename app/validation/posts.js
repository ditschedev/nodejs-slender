const Joi = require('joi');

module.exports = {
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