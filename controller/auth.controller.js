const db = require('../models/funcDatabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

const generateAccessToken = (id, email, role) => {
    const payload = {
        id, email, role
    }
    return jwt.sign(payload, secret);
}

class AuthController {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await db.getUserEmail(email);
            if (!user) return res.status(400).json({message: `User ${email} not found`})
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.status(400).json({message: `Wrong password entered`})
            const access_token = generateAccessToken(user.id, user.email, "user");
            await db.saveToken(user.id, access_token);
            res.json({ access_token })
        } catch(e) {
            console.log(e);
            res.status(400).json({message: "Error login"});
        }
    }
    async loginAdmin(req, res) {
        try {
            const {email, password} = req.body;
            const user = await db.getUserEmail(email, "admin");
            if (!user) return res.status(400).json({message: `Administrator ${email} not found`})
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) return res.status(400).json({message: `Wrong password entered`})
            const access_token = generateAccessToken(user.id, user.email, "admin");
            await db.saveToken(user.id, access_token);
            res.json({ access_token })
        } catch(e) {
            console.log(e);
            res.status(400).json({message: "Error Admin login"});
        }
    }
}

module.exports = new AuthController()