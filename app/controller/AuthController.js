const Joi = require('joi');
const RestResponse = require('../response/RestResponse');

exports.register = (req, res) => {

    const Validator = Joi.object({

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
    });

    const {error, value} = Validator.validate(req.body);

    if(error) {
        return RestResponse.invalidData(res, 'Invalid data', error);
    }

    

};