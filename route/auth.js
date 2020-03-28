const express = require("express");
const { AuthController } = require('../app/controller');

let router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify", AuthController.verify);
router.get('/me', AuthController.me);

module.exports = router;