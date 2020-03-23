const express = require("express");
const AuthController = require('../app/controller/AuthController');

let router = express.Router();

router.post("/register", AuthController.register);
//router.post("/login", AuthController.login);
//router.get("/verify/:key", AuthController.verify);

module.exports = router;