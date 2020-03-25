const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');
const { posts } = require('../../validation/rules');
const Post = require('../../model/Post');

exports.all = [
    auth,
    //hasRole(),
    (req, res) => {
        try {
            Post.find().populate('author').exec((err, posts) => {
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
    validator(posts.create),
    (req, res) => {
        try {
            let post = new Post(req.body);
            post.author = req.user._id;
            post.save().then((post) => {
                post.populate('author').execPopulate().then((post) => {
                    return RestResponse.successData(res, "Post created successfully", post);
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
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
    validator(posts.update),
    (req, res) => {
        try {
            if(!req.params.id) return RestResponse.bad(res, "No id provided");
            if(req.params.id !== req.body.id) return RestResponse.bad(res, "Given id doesn't match the id of the given object"); 
            Post.findById(req.params.id).exec((err, post) => {
                if(err) return RestResponse.error(res, err);
                if(!post) return RestResponse.notFound(res, "Post not found");
                post.update(req.body, (err, status) => {
                    if(err) return RestResponse.error(res, err);
                    post.populate('author').execPopulate().then((post) => {
                        return RestResponse.successData(res, "Post has been saved", post);
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
            Post.findById(req.params.id).exec((err, post) => {
                if(err) return RestResponse.error(res, err);
                if(!post) return RestResponse.notFound(res, "Post not found");
                post.remove().then(() => {
                    return RestResponse.success(res, "Post has been deleted");
                }).catch((err) => {
                    return RestResponse.error(res, err);
                });
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];