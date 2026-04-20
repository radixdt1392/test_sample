const jwt = require('jsonwebtoken');

function authMiddleware(req, resp, next) {
    const token = req.cookies?.token;

    if (!token) {
        return resp.redirect('/api/auth/login');
    }
    try {
        //verify token
        const tokenMatched = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenMatched;
        next();
    } catch (error) {
        resp.clearCookie('token');
        return resp.redirect('/api/auth/login');
    }
}

module.exports = authMiddleware;