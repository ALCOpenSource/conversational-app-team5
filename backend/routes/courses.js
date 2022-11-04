const express = require('express');
const router = express.Router();

const CoursesController = require('../controllers/courses');

router.get('/', CoursesController.index);

router.post('/', CoursesController.create);

router.get('/:id', CoursesController.get);

router.patch('/:id', CoursesController.update);

router.delete('/:id', CoursesController.delete);

module.exports = router;