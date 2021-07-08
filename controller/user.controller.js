const db = require('../models/funcDatabase');

class UserController {
    async createUser(req, res) {
        try {
            const {email, password, firstname, lastname} = req.body;
            const candidate = await db.getUserEmail(email);
            if (candidate) return res.status(400).json({message: "Пользователь с такой почтой уже существует"});
            const resUser = await db.createUser(email, password, firstname, lastname);
            res.json(resUser);
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "Error Create User"})
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.body;
            const user = await db.getUserId(id);
            if (!user) return res.status(400).json({message: "Пользователь с таким id не существует"});
            const resUser = await db.deleteUser(id);
            res.json(resUser);
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "Error Delete User"})
        }
    }
    
    async getUsers(req, res) {
        try {
            const resUser = await db.getUsers();
            res.json(resUser)
        } catch(e) {
            console.log(e);
            res.status(400).json({message: "Error Get Users"});
        }
    }
}

module.exports = new UserController()