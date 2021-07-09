class WorkplaceController {
    async addWorkplace(req, res) {
        const {place_name, x, y} = req.body;
    }
}

module.exports = new WorkplaceController()