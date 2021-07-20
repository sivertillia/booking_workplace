module.exports = function(roles) {
    return function(req, res, next) {
        try {
            if(req.method === "OPTIONS") next();
            const token = req.headers.authorization.split(' ')[1]
            const {role: userRole} = jwt.verify(token, secret);
            let hasRole = false
            if(roles.includes(userRole)) hasRole = true
            if(!hasRole) return res.status(403).json({error: "You don't have access"})
            next()
        } catch (e) {
            return res.status(401).json({error: "User is not logged in"})
        }
    }
}