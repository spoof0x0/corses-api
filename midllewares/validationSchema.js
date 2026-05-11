const {body} = require('express-validator');

const validationSchema = () => {
    return [
            body('name')
                .notEmpty()
                .withMessage('Name is required')
                .isLength({ min: 3 })
                .withMessage('at least 3 chars'),
            body('price')
                .isFloat({ min: 0 })
                .withMessage('Price must be a positive number')
        ];
};

module.exports = {
    validationSchema
};