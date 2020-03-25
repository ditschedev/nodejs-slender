const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');
const hasRole = require('../middleware/hasRole');
const roleRules = require('../../validation/roles');
const Role = require('../../model/Role');

exports.all = [
    auth,
    //hasRole('ROLE_SHOW'),
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

exports.create = [
    auth,
    hasRole('ROLE_CREATE'),
    validator(roleRules.create),
    (req, res) => {
        try {
            console.log(req.user);
            Role.find({roleKey: req.body.roleKey}).then((role) => {
                if(role) return RestResponse.conflict(res, "RoleKey `" + req.body.roleKey + "` already used");

                role = new Role(req.body);
                role.save().then((role) => {
                    return RestResponse.successData(res, "Role created successfully", role);
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.update = [
    auth,
    hasRole('ROLE_UPDATE'),
    validator(roleRules.update),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            if(req.params.id !== req.body.id) return RestResponse.bad(res, "Given id doesn't match the id of the given object"); 
            Role.findById(req.params.id).exec((err, role) => {
                if(err) return RestResponse.error(res, err);
                if(!role) return RestResponse.notFound(res, "Role not found");
                role.update(req.body, (err, status) => {
                    if(err) return RestResponse.error(res, err);
                    return RestResponse.successData(res, "Role has been saved", role);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.delete = [
    auth,
    hasRole('ROLE_DELETE'),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            Role.findById(req.params.id).exec((err, role) => {
                if(err) return RestResponse.error(res, err);
                if(!role) return RestResponse.notFound(res, "Role not found");
                role.remove().then(() => {
                    return RestResponse.success(res, "Role has been deleted");
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];