const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { validationSchema } = require('../midllewares/validationSchema');
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../midllewares/verifyToken');
const { allowedTo } = require('../midllewares/allowedTo');  
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileName = `user-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ 
    storage: diskStorage,
    fileFilter: fileFilter
});




router.route('/')
    .get(verifyToken, allowedTo('admin'), usersController.getAllUsers)
    // .post(validationSchema(), usersController.addUser);


router.route('/register')
    .post(upload.single('avatar'), usersController.register)


router.route('/login')
    .post(usersController.login)

// router.route('/:id')
    // .get(usersController.getUser)
    // .patch(usersController.editUser)
    // .delete(usersController.deleteUser);


module.exports = router;