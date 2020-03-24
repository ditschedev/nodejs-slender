const crypto = require('crypto');

exports.randomString = function(length) {
    return crypto.randomBytes(length/2).toString('hex');
};

exports.generateLink = function(path) {
    return process.env.EMAIL_BASE_URL + path;
}