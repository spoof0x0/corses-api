const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const coursesController = require('../controllers/courses.controller');
const { validationSchema } = require('../midllewares/validationSchema');
const { verifyToken } = require('../midllewares/verifyToken');  


router.route('/')
    .get(verifyToken, coursesController.getAllCourses)
    .post(verifyToken, validationSchema(), coursesController.addCourse);


router.route('/:id')
    .get(verifyToken, coursesController.getCourse)
    .patch(verifyToken, coursesController.editCourse)
    .delete(verifyToken, coursesController.deleteCourse);


module.exports = router;