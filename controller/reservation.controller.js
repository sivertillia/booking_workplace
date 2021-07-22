const db = require('../models/funcDatabase');

class ReservationController {
    async getReservationDate(req, res) {
        try {
            const {date} = req.query;
            if (!date) return res.status(400).json({error: "Query date not found"});
            console.log(date);
            const resDate = await db.getReservationDate(date);
            res.json(resDate);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Get Reservation"});
        }
    }
    async getReservation(req, res) {
        try {
            const {id} = req.user;
            console.log(`User id: ${id}`);
            const user = await db.getUserId(id);
            if (!user) return res.status(400).json({error: "User with this ID does not exist"});
            const resReservation = await db.getReservation(id.toString());
            res.json(resReservation);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Get Reservation"});
        }
    }
}

module.exports = new ReservationController()