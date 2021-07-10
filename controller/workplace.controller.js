const db = require('../models/funcDatabase');

class WorkplaceController {
    async createWorkplace(req, res) {
        try {
            const {place_name, x, y} = req.body;
            const candidate = await db.getWorkplaceNameXY(place_name, x, y);
            if (candidate) return res.status(400).json({error: "Place name or location already exists"})
            const resWorkplace = await db.createWorkplace(place_name, x, y);
            res.json(resWorkplace);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Create Workplace"})
        }
    }
    async deleteWorkplace(req, res) {
        try {
            const {id} = req.body;
            const workplace = await db.getWorkplaceId(id);
            if (!workplace) return res.status(400).json({error: "Workplace with this ID does not exist"});
            const resWorkplace = await db.deleteByID(id, "workplace");
            res.json(resWorkplace);
        } catch(e) {
            console.log(e)
            res.status(400).json({error: "Error Delete Workplace"})
        }
    }
    async getWorkplace(req, res) {
        try {
            const resWorkplace = await db.getTable("workplace");
            res.json(resWorkplace);
        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Error Get Workplace"});
        }
    }
}

module.exports = new WorkplaceController()