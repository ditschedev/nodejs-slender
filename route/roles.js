const express = require("express");
const RoleController = require('../app/controller/RoleController');

let router = express.Router();

router.get('/', RoleController.all);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;