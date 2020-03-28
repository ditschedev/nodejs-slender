const express = require("express");
const { RoleController } = require('../app/controller');

let router = express.Router();

router.get('/', RoleController.all);

module.exports = router;