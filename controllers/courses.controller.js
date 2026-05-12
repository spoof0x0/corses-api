const Course = require('../models/Course');
const {validationResult, query} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');


const getAllCourses = async (req, res) => {
    try {
        const limit = req.query.limit || 2;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;
        const courses = await Course.find({}, { __v: false }).skip(skip).limit(limit);
        res.json({status: httpStatusText.SUCCESS, data: {courses: courses}});
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id, { __v: false });
        if (!course) return res.status(404).json({ status: httpStatusText.FAIL, message: 'Course not found' });
        res.json({ status: httpStatusText.SUCCESS, data: { course: course } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const addCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: httpStatusText.FAIL, data: {message: errors.array()} });
        }

        const course = await Course.create(req.body);

        res.status(201).json({status: httpStatusText.SUCCESS,data: { course: course }});
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const editCourse = async (req, res) => {
    try {
        let course = await Course.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', __v: false });
        if (!course) return res.status(404).json({ status: httpStatusText.FAIL, message: 'Course not found' });
        res.json({ status: httpStatusText.SUCCESS, data: { course: course } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ status: httpStatusText.FAIL, message: 'Course not found' });
        res.json({ status: httpStatusText.SUCCESS, data: null });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    editCourse,
    deleteCourse
};