const jwt = require('jsonwebtoken');
const {secret} = require("../config");

module.exports = function(req, res, next) {
    try {
        if(req.method === "OPTIONS") next();
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next()
    } catch (e) {
        // console.log(e)
        return res.status(401).json({message: "User is not logged in"})
    }
}