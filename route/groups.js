const express = require("express");
const { GroupController } = require('../app/controller');

let router = express.Router();

router.get('/', GroupController.all);
router.post('/', GroupController.create);
router.put('/:id', GroupController.update);
router.delete('/:id', GroupController.delete);

router.post('/:id/users', GroupController.addUser);
router.delete('/:id/users/:userId', GroupController.removeUser);

router.post('/:id/roles', GroupController.addRole);
router.post('/:id/roles/:roleId', GroupController.removeRole);

module.exports = router;