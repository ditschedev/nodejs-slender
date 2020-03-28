const jwt  = require('jsonwebtoken');
const RestResponse = require('../response/RestResponse');
const User = require('../model/user.model');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const info  =  jwt.verify(token, secret)
        User.findOne({ _id: info.id}).then((user) => {
            if(!user) return RestResponse.unauthorized(res, "Invalid authentication token");
            
            user.populate('roles').populate({
                path: 'groups',
                populate: {
                    path: 'roles',
                    model: 'Role'
                }
            }).execPopulate().then((user) => {
                req.token = token;
                req.user = user;
                next();
            }).catch((err) => {
                return RestResponse.error(res, err);
            });
        });
    } catch (error) {
        return RestResponse.unauthorized(res, "Not authenticated");
    }
};