const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { validationSchema } = require('../midllewares/validationSchema');
const usersController = require('../controllers/users.controller');






router.route('/')
    .get(usersController.getAllUsers)
    // .post(validationSchema(), usersController.addUser);


router.route('/register')
    .post(usersController.register)


router.route('/login')
    .post(usersController.login)

// router.route('/:id')
    // .get(usersController.getUser)
    // .patch(usersController.editUser)
    // .delete(usersController.deleteUser);


module.exports = router;