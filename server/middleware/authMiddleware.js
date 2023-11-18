const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;


   if ("token" == null){
    res.clearCookie("token");
    res.status(401).json("you need to login first");
}

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { authenticateToken };
