class ReservationController {
    async getReservation(req, res) {
        try {
            const {date} = req.query;
            res.json(date);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Get Reservation"});
        }
    }
}

module.exports = new ReservationController()