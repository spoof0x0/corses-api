const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const coursesController = require('../controllers/courses.controller');
const { validationSchema } = require('../midllewares/validationSchema');



router.route('/')
    .get(coursesController.getAllCourses)
    .post(validationSchema(), coursesController.addCourse);


router.route('/:id')
    .get(coursesController.getCourse)
    .patch(coursesController.editCourse)
    .delete(coursesController.deleteCourse);


module.exports = router;