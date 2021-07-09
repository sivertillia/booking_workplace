const db = require('../models/funcDatabase');
const {validationResult} = require('express-validator');

class UserController {
    async createUser(req, res) {
        try {
            const {email, password, firstname, lastname} = req.body;
            const candidate = await db.getUserEmail(email);
            if (candidate) return res.status(400).json({error: "User with such email already exists"});
            const resUser = await db.createUser(email, password, firstname, lastname);
            res.json(resUser);
        } catch(e) {
            console.log(e)
            res.status(400).json({message: "Error Create User"})
        }
    }

    async editUser(req, res) {
        try {
            const {id, email, password, firstname, lastname} = req.body;
            const user = await db.getUserId(id);
            const candidate = await db.getUserEmail(email);
            if (!user) return res.status(400).json({error: "User with this ID does not exist"});
            if (candidate) {
                if (candidate.id != user.id) return res.status(400).json({error: "User with such email already exists"});
            }
            const resUser = await db.updateUser(id, email, password, firstname, lastname);
            res.json(resUser);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Edit User"});
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.body;
            const user = await db.getUserId(id);
            if (!user) return res.status(400).json({error: "User with this ID does not exist"});
            const resUser = await db.deleteUser(id);
            res.json(resUser);
        } catch(e) {
            console.log(e)
            res.status(400).json({error: "Error Delete User"})
        }
    }
    
    async getUsers(req, res) {
        try {
            const resUser = await db.getUsers();
            res.json(resUser)
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Get Users"});
        }
    }
}

module.exports = new UserController()