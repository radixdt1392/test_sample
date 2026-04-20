
function authorizeRoles(...allowedRoles) {

    return (req, resp, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            // return resp.status(403).send("Access Denied:: you do not have access for this.")
            return resp.status(403).render('access', {
                pageName:'Access Desnied'
            });
        }
        next();
    }
}
module.exports = authorizeRoles