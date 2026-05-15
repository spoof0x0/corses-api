const httpStatusText = require('../utils/httpStatusText');
const jwt = require('jsonwebtoken');



module.exports = {
    allowedTo: (...roles) => {
        return (req, res, next) => {
            const role = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_SECRET).role;
            if (!roles.includes(role)) {
                return res.status(401).json({ status: httpStatusText.FAIL, message: 'Unauthorized' });
            }
            if (!roles.includes(role)) {
                return res.status(403).json({ status: httpStatusText.FAIL, message: 'Forbidden' });
            }
            next();
        };
    }
};