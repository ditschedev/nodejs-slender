const express = require("express");
const PostController = require('../app/controller/PostController');

let router = express.Router();

router.get('/', PostController.all);
router.post('/', PostController.create);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);

module.exports = router;