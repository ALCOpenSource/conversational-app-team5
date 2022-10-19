const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.get('/', UsersController.index);

router.post('/', UsersController.create);

router.get('/:id', UsersController.get);

router.patch('/:id', UsersController.update);

router.delete('/:id', UsersController.delete);

module.exports = router;