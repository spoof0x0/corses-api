const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000; 
const { get } = require('node:http');
const coursesController = require('./controllers/courses.controller');
const data = require('./data/courses');
const { courses } = require('./data/courses');
const coursesRoute = require('./routeres/courses.route');

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/courses', coursesRoute);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});