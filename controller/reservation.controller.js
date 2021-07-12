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
}

module.exports = new ReservationController()