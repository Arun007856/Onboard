const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Access denied' });
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.secret,
        (err, decoded) => {
            if (err) res.status(401).json({ error: 'Access denied' });
            req.user = decoded.userName;
            req.roles = decoded.role;

            next();
        }
    );
}
module.exports = verifyJWT