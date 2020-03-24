const RestResponse = require('../response/RestResponse');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');
const { posts } = require('../../validation/rules');
const Post = require('../../model/Post');

exports.all = [
    auth,
    (req, res) => {
        try {
            Post.find().populate('author').exec((err, posts) => {
                if(err) return RestResponse.error(res, err);
                console.log(posts);
                return RestResponse.successData(res, "Success", posts);
            });
            //return RestResponse.success(res, "Ok");
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
                return RestResponse.successData(res, "Post created successfully", post);
            }).catch((err) => {
                return RestResponse.error(res, err);
            });
        } catch(err) {
            return RestResponse.error(res, err);
        }
    }
];