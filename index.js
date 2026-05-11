const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000; 
const { get } = require('node:http');
const coursesController = require('./controllers/courses.controller');
const coursesRoute = require('./routeres/courses.route');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluspoof.2l8ihaj.mongodb.net/code-zone-project');
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};
connectDB();



app.use(morgan('dev'));

app.use(express.json());

app.use('/api/courses', coursesRoute);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});