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
        weight: Joi.number()
                .max(1000)
                .min(0)
                .required(),
        isDefault: Joi.boolean()
                        .default(false)
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
        weight: Joi.number()
                .max(1000)
                .min(0)
                .required(),
        isDefault: Joi.boolean()
                        .default(false)
    },
    addUser: {
        userId: Joi.string()
                .required()
    },
    removeUser: {

    },
    addRole: {

    },
    removeRole: {

    }
};