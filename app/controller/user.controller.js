const RestResponse = require('../response/RestResponse');
const { auth, validator, hasRole } = require('../middleware');
const { userRules } = require('../validation');
const { User } = require('../model');

exports.all = [
    auth,
    hasRole('USER_SHOW'),
    (req, res) => {
        try {
            User.find().then((posts) => {
                return RestResponse.successData(res, "Success", posts);
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.create = [
    auth,
    hasRole('USER_CREATE'),
    validator(userRules.create),
    (req, res) => {
        try {
            let user = new User(req.body);
            user.groups = [req.body.groupId]
            user.save().then((user) => {
                return RestResponse.successData(res, "User created successfully", user);
            }).catch((err) => {
                return RestResponse.error(res, err);
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.update = [
    auth,
    hasRole('USER_UPDATE'),
    validator(userRules.update),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            if(req.params.id !== req.body.id) return RestResponse.bad(res, "Given id doesn't match the id of the given object"); 
            User.findById(req.params.id).exec((err, user) => {
                if(err) return RestResponse.error(res, err);
                if(!user) return RestResponse.notFound(res, "User not found");
                post.update(req.body, (err, status) => {
                    if(err) return RestResponse.error(res, err);
                    return RestResponse.successData(res, "User has been saved", user);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.delete = [
    auth,
    hasRole('USER_DELETE'),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            User.findById(req.params.id).exec((err, user) => {
                if(err) return RestResponse.error(res, err);
                if(!user) return RestResponse.notFound(res, "User not found");
                user.remove().then(() => {
                    return RestResponse.success(res, "User has been deleted");
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];