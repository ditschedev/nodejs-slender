const crypto = require('crypto');
const constants = require('./constants');

exports.randomString = function(length) {
    return crypto.randomBytes(length/2).toString('hex');
};

exports.generateLink = function(path) {
    return constants.mailer.base_url + path;
}