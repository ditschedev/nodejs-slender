const auth = require('./auth.middleware');
const hasRole = require('./hasrole.middleware');
const validator = require('./validator.middleware');

module.exports = {
    auth, 
    hasRole,
    validator
}