const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');
const groupRules = require('../../validation/groups');
const Group = require('../../model/Group');
const Role = require('../../model/Role');
const User = require('../../model/User');

exports.all = [
    auth,
    (req, res) => {
        try {
            Group.find().populate('roles').exec((err, groups) => {
                if(err) return RestResponse.error(res, err);
                return RestResponse.successData(res, "Success", groups);
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.create = [
    auth,
    validator(groupRules.create),
    (req, res) => {
        try {
            Group.findOne({title: req.body.title}).then((group) => {
                if(group) return RestResponse.conflict(res, "Given title is already in use");
                group = new Group(req.body);
                group.save().then((group) => {
                    group.populate('roles').execPopulate().then((group) => {
                        return RestResponse.successData(res, "Group created successfully", group);
                    }).catch((err) => {
                        return RestResponse.error(res, err);
                    });
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
    validator(groupRules.update),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            if(req.params.id !== req.body.id) return RestResponse.bad(res, "Given id doesn't match the id of the given object"); 
            Group.findById(req.params.id).exec((err, group) => {
                if(err) return RestResponse.error(res, err);
                if(!group) return RestResponse.notFound(res, "Group not found");
                // TODO: Rewrite to use save instead of update
                group.update(req.body, (err, status) => {
                    if(err) return RestResponse.error(res, err);
                    group.populate('roles').execPopulate().then((group) => {
                        return RestResponse.successData(res, "Group has been saved", group);
                    }).catch((err) => {
                        return RestResponse.error(res, err);
                    });
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

exports.delete = [
    auth,
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            Group.findById(req.params.id).exec((err, group) => {
                if(err) return RestResponse.error(res, err);
                if(!group) return RestResponse.notFound(res, "Group not found");
                group.remove().then(() => {
                    return RestResponse.success(res, "Group has been deleted");
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];

// POST /groups/:id/users
exports.addUser = [
    auth,
    validator(groupRules.addUser),
    (req, res) => {
        // TODO: Check if given :id is valid
        Group.findById(req.params.id).then((group) => {
            User.findById(req.body.userId).then((user) => {
                if(!user) return RestResponse.bad(res, "Given user invalid");

                // TODO: Check if user is in group

                user.groups.push(group);
                user.save().then((user) => {
                    group.users.push(user);
                    group.save().then((group) => {
                        return RestResponse.success(res, "User was added to group " + group.title);
                    }).catch((err) => {
                        return RestResponse.error(res, err);
                    });
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        }).catch((err) => {
            return RestResponse.error(res, err);
        });
    }
];

// DELETE /groups/:id/users/:uid
exports.removeUser = [
    auth,
    (req, res) => {
        User.findById(req.body.userId).then((user) => {
            if(!user) return RestResponse.bad(res, "Given user invalid");
            console.log(user);

            return RestResponse.success(res, "");
        });
    }
];

// POST /groups/:id/roles
exports.addRole = [
    auth,
    (req, res) => {
        // TODO: Check if given :id is valid
        Group.findById(req.params.id).then((group) => {
            Role.findById(req.body.roleId).then((role) => {
                if(!role) return RestResponse.bad(res, "Given role invalid");

                // TODO: Check if role is in group

                role.groups.push(group);
                role.save().then((role) => {
                    group.roles.push(role);
                    group.save().then((group) => {
                        return RestResponse.success(res, "Role was added to group " + group.title);
                    }).catch((err) => {
                        return RestResponse.error(res, err);
                    });
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        }).catch((err) => {
            return RestResponse.error(res, err);
        });
    }
];

// DELETE /groups/:id/roles/:rid
exports.removeRole = [
    auth,
    (req, res) => {

    }
];