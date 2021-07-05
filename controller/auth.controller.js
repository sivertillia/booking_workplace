const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');
const TokenModel = require('../models/token.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

const generateAccessToken = (id, email, role) => {
    const payload = {
        id, email, role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}
async function saveTokenBD(user_id, token) {
    const user = await TokenModel.findOne({where: {user_id: user_id.toString()}});
    if(!user) {
        return await TokenModel.create({
            user_id: user_id,
            token: token
        })
    }
    await TokenModel.update({ token: token }, {
        where: {
            user_id: user_id
        }
    })
}

class AuthController {
    async login(req, res) {
        const {email, password} = req.body;
        const user = await UserModel.findOne({where: {email: email}});
        if (!user) return res.status(400).json({message: `Пользователь ${email} не найден`})
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({message: `Введен неверный пароль`})
        const access_token = generateAccessToken(user.id, user.email, "user");
        await saveTokenBD(user.id, access_token);
        res.json({ access_token })
    }
    async loginAdmin(req, res) {
        const {email, password} = req.body;
        const user = await AdminModel.findOne({where: {email: email}});
        if (!user) return res.status(400).json({message: `Администратор ${email} не найден`})
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({message: `Введен неверный пароль`})
        const access_token = generateAccessToken(user.id, user.email, "admin");
        await saveTokenBD(user.id, access_token);
        res.json({ access_token })
    }
}

module.exports = new AuthController()