const user = require('../models/user');
const {validationResult} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { notify } = require('../routeres/courses.route');

const getAllUsers = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;
        const users = await user.find({}, { __v: false, password: false }).skip(skip).limit(limit);
        res.json({status: httpStatusText.SUCCESS, data: {users: users}});
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};


const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    
    const existingUser = await user.findOne({email});
    if (existingUser) {
        return res.status(400).json({ status: httpStatusText.FAIL, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
    });
    const token = await jwt.sign({ email: email , id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    newUser.token = token;

    await newUser.save();
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        }
    });
};


const login = async (req, res) => {
    const { email, password } = req.body;

    const oldUser = await user.findOne({ email });
    if (!oldUser) {
        return res.status(400).json({ status: httpStatusText.FAIL, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
        return res.status(400).json({ status: httpStatusText.FAIL, message: 'Invalid credentials' });
    }

    const token = await jwt.sign({ email: email , id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    oldUser.token = token;

    res.json({
        status: httpStatusText.SUCCESS,
        data: {
            user: {
                _id: oldUser._id,
                firstName: oldUser.firstName,
                lastName: oldUser.lastName,
                email: oldUser.email,
                token: oldUser.token
            }
        }
    });
};


module.exports = {
    getAllUsers,
    register,
    login
};