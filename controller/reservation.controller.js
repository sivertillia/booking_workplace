const ReservationModel = require('../models/reservation.model');
// const AdminModel = require('../models/admin.model');
// const TokenModel = require('../models/token.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const {secret} = require("../config");

class ReservationController {
    async saveReservation(req, res) {
        const {place_id, user_id, date, time_from, time_to} = req.body;

    }
    async removeReservation(req, res) {
        const {id, user_id} = req.body;
        const reservation = await ReservationModel.findAll({where: {user_id: user_id}});
        if (!reservation) return res.status(400).json({message: `Резервации не найдено`})
        res.json("ok")
    }
}

module.exports = new ReservationController()