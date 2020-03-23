const Joi = require('joi');
const { invalidData } = require('../response/RestResponse');

module.exports = function(object, abortEarly = false) {

    return (req, res, next) => {

        const Validator = Joi.object(object)
                            .options({abortEarly: abortEarly});

        const {error, value} = Validator.validate(req.body);

        if(error) invalidData(res, "Invalid data", error);
        else {
            req.body = value;
            next();
        }
    };
}