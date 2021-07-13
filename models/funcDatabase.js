const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');
const TokenModel = require('../models/token.model');
const ReservationModel = require('../models/reservation.model');
const WorkplaceModel = require('../models/workplace.model');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

async function getUserId(id, role="user") {
    if (role == "user") return await UserModel.findByPk(id);
    if (role == "admin") return await UserModel.findByPk(id);
}
async function getUserEmail(email, role="user") {
    if (role == "user") return await UserModel.findOne({where: {email: email}});
    if (role == "admin") return await AdminModel.findOne({where: {email: email}});
}
async function getWorkplaceId(id) {
    return await WorkplaceModel.findOne({where: {id: id}});
}

async function getReservationDate(date) {
    console.log(date);
    return await ReservationModel.findAll({where: 
        {
        date: date
        }
    })
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
    await UserModel.update(
        {
            email: email,
            password: hashPassword,
            firstname: firstname,
            lastname: lastname
        },{
            where: {id: id}
        }
    )
    return
}

async function deleteByID(id, why) {
    if (why == "user") {await UserModel.destroy({where: {id: id}}); return "true"}
    if (why == "workplace") {await WorkplaceModel.destroy({where: {id: id}}); return "true"}
    return "false"
}

async function getTable(table) {
    if (table == "users") return await UserModel.findAll({attributes: {exclude: ['password']}});
    if (table == "workplace") return await WorkplaceModel.findAll();
    return "false"
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

async function getWorkplaceNameXY(place_name, x, y) {
    const placeName = await WorkplaceModel.findOne({where: {place_name: place_name}});
    const xy = await WorkplaceModel.findOne({
        where: 
            {
                x: x,
                y: y
            }
        });
    if (placeName) return placeName
    if (xy) return xy
}

async function createWorkplace(place_name, x, y) {
    const workplace = await WorkplaceModel.create({
        place_name: place_name,
        x: x,
        y: y
    })
    const resUser = {
        id: workplace.id, 
        place_name: workplace.place_name, 
        x: workplace.x, 
        y: workplace.y 
    }
    return resUser
}

module.exports = {
    getUserId: getUserId,
    getUserEmail: getUserEmail,
    getWorkplaceId: getWorkplaceId,
    getReservationDate: getReservationDate,
    createUser: createUser,
    updateUser: updateUser,
    deleteByID: deleteByID,
    getTable: getTable,
    saveToken: saveToken,
    getWorkplaceNameXY: getWorkplaceNameXY,
    createWorkplace: createWorkplace,
}