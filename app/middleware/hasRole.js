const RestResponse = require('../response/RestResponse');
require('../../model/Group');

module.exports = function(roleKey) {
    return (req, res, next) => {
        try {
            if(req.user.roles.some(role => role.roleKey === roleKey)) {
                next();
            } else {
                let test = false;
                req.user.groups.forEach(group => {
                    group.populate('roles').execPopulate().then((group) => {
                        if(group.roles.some(role => {
                            return role.roleKey === roleKey
                        })) {
                            next();
                            test = true;
                        }
                    }).catch((err) => {
                        return RestResponse.error(res, err);
                    });
                });
                return RestResponse.forbidden(res, "Insufficient permissions");
            }
        } catch(err) {
            return RestResponse.error(res, err);
        }
    };
};