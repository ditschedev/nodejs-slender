const Joi = require('joi');

module.exports = {
    create: {
        title: Joi.string()
                .min(3)
                .max(24)
                .required(),
        description: Joi.string()
                        .max(80)
                        .required(),
        roleKey: Joi.string()
                    .min(4)
                    .max(24)
                    .uppercase()
                    .required()
    },
    update: {
        id: Joi.string()
                .required(),
        title: Joi.string()
                .min(3)
                .max(24)
                .required(),
        description: Joi.string()
                        .max(80)
                        .required(),
        roleKey: Joi.string()
                    .min(4)
                    .max(24)
                    .uppercase()
                    .required()
    }
}