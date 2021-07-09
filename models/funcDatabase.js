const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');
const TokenModel = require('../models/token.model');
const ReservationModel = require('../models/reservation.model');
const WorkplaceModel = require('../models/workplace.model');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

async function getUserId(id, role="user") {
    if (role == "user") return await UserModel.findOne({where: {id: id}});
    if (role == "admin") return await UserModel.findOne({where: {id: id}});
}
async function getUserEmail(email, role="user") {
    if (role == "user") return await UserModel.findOne({where: {email: email}});
    if (role == "admin") return await AdminModel.findOne({where: {email: email}});
}


async function createUser(email, password, firstname, lastname) {
    const hashPassword = bcrypt.hashSync(password, 8);
    const user = await UserModel.create({
        email: email,
        password: hashPassword,
        firstname: firstname,
        lastname: lastname
    })
    const resUser = {
        id: user.id, 
        email: user.email, 
        firstname: user.firstname, 
        lastname: user.lastname, 
    }
    return resUser
}

async function updateUser(id, email, password, firstname, lastname) {
    const hashPassword = bcrypt.hashSync(password, 8);
    const user = await UserModel.update(
        {
            email: email,
            password: hashPassword,
            firstname: firstname,
            lastname: lastname
        },
        {where: {id: id}}
    )
    const resUser = {
        id: user.id, 
        email: user.email, 
        firstname: user.firstname, 
        lastname: user.lastname, 
    }
    return resUser
}

async function deleteUser(id) {
    const user = await UserModel.destroy({where: {id: id}})
    return "true"
}

async function getUsers() {
    const users = await UserModel.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    return users
}

async function saveToken(user_id, token) {
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


module.exports = {
    getUserId: getUserId,
    getUserEmail: getUserEmail,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUsers: getUsers,
    saveToken: saveToken,
}