const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

class UserController {
    async createUser(req, res) {
        const {email, password, firstname, lastname} = req.body;
        const candidate = await UserModel.findOne({where: {email: email}});
        if (candidate) return res.status(400).json({message: "Пользователь с таким именем уже существует"});
        const hashPassword = bcrypt.hashSync(password, 8);
        UserModel.create({
            email: email,
            password: hashPassword,
            firstname: firstname,
            lastname: lastname
        })
        res.json("true");
    }

    async deleteUser(req, res) {
        const {id} = req.body;
        const user = await UserModel.findOne({where: {id: id}});
        if (!user) return res.status(400).json({message: "Пользователь с таким id не существует"});
        UserModel.destroy({
            where: {id: id}
        })
        res.json("true");
    }
    
    async getUsers(req, res) {
        const users = await User.findAll()
        res.json(users)
    }
}

module.exports = new UserController()