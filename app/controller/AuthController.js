const RestResponse = require('../response/RestResponse');
const validate = require('../validation/Validator');

exports.register = (req, res) => {
        validate(req, {
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
        }).then((body) => {
            return RestResponse.success(res, "Test");
        }).catch((error) => {
            return RestResponse.invalidData(res, 'Invalid data', error);
        });
    };