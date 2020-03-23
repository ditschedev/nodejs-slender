const Joi = require('joi');

module.exports = function(req, object, abortEarly = false) {

    return new Promise((resolve, reject) => {

        const Validator = Joi.object(object)
                            .options({abortEarly: abortEarly});

        const {error, value} = Validator.validate(req.body);

        if(error) {
            reject(error);
        }

        resolve(value);

    });

}