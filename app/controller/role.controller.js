const RestResponse = require('../response/RestResponse');
const { auth, hasRole } = require('../middleware');
const { Role } = require('../model');

exports.all = [
    auth,
    hasRole('ROLE_SHOW'),
    (req, res) => {
        try {
            Role.find().exec((err, posts) => {
                if(err) return RestResponse.error(res, err);
                return RestResponse.successData(res, "Success", posts);
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];