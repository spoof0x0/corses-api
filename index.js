const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv').config();

const coursesRoute = require('./routeres/courses.route');
const usersRoute = require('./routeres/users.route');
const path = require('path');
const url = process.env.MONGO_URL;
const port = process.env.PORT;

const app = express();








const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};
connectDB();



app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/courses', coursesRoute);
app.use('/api/users', usersRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});