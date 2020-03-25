const RestResponse = require('../response/RestResponse');
require('../../model/Group');

module.exports = function(roleKey) {
    return (req, res, next) => {
        try {
            if(req.user.getRoles.includes(roleKey))
                next();
            else
                return RestResponse.forbidden(res, "Insufficient permissions");
        } catch(err) {
            return RestResponse.error(res, err);
        }
    };
};