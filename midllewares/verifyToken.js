const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: httpStatusText.FAIL, message: 'Unauthorized, invalid token format' });
    }
    const token = authHeader.split(' ')[1];
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
    } catch (err) {
        return res.status(401).json({ status: httpStatusText.FAIL, message: 'Unauthorized' });
    }
}

module.exports = {
    verifyToken
};