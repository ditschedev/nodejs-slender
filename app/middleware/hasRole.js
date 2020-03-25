const RestResponse = require('../response/RestResponse');

module.exports = function(roleKey) {
    return (req, res, next) => {
        try {
            if(req.user.roles.some(role => role.roleKey === roleKey)) {
                next();
            } else {
                return RestResponse.unauthorized(res, "Insufficient permissions");
            }
        } catch(err) {
            return RestResponse.error(res, err);
        }
    };
};