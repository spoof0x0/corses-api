const Course = require('../models/Course');
const {validationResult} = require('express-validator');



const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
};

const addCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const course = await Course.create(req.body);

        res.status(201).json({
            msg: "Course added successfully",
            course
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create course' });
    }
};

const editCourse = async (req, res) => {
    try {
        let course = await Course.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json({ msg: "Course updated successfully", course });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update course' });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json({ msg: "Course deleted successfully", course });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete course' });
    }
};

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    editCourse,
    deleteCourse
};