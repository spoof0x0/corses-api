let { courses } = require('../data/courses');
const {validationResult} = require('express-validator');



const getAllCourses = (req, res) => {
    res.send(courses);
};

const getCourse = (req, res) => {
    const course = courses.find(c => c.id === +req.params.id);
    if (!course) return res.status(404).send('Course not found');
    res.send(course);
};

const addCourse = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = {
        id: courses.length + 1,
        ...req.body
    };
    courses.push(course);
    res.status(201).json({ msg: "Course added successfully", course });
};

const editCourse = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let course = courses.find(c => c.id === +req.params.id);
    if (!course) return res.status(404).send('Course not found');
    // course.name = req.body.name;
    course = { ...course, ...req.body };
    // Object.assign(course, req.body);
    res.json({ msg: "Course updated successfully", course });
}

const deleteCourse = (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === +req.params.id);
    if (courseIndex === -1) return res.status(404).send('Course not found');
    const deletedCourse = courses.splice(courseIndex, 1);
    res.json({ msg: "Course deleted successfully", course: deletedCourse[0] });
};

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    editCourse,
    deleteCourse
};