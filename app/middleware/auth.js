const jwt  = require('jsonwebtoken');
const RestResponse = require('../response/RestResponse');
const User = require('../../model/User');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const info  =  jwt.verify(token, "thisiskey")
        User.findOne({ _id: info.id}).then((user) => {
            if(!user) return RestResponse.unauthorized(res, "Invalid authentication token");

            req.token = token;
            req.user = user;
            next();
        });
    } catch (error) {
        return RestResponse.unauthorized(res, "Not authenticated");
    }
};