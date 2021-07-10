const {body, check, validationResult} = require('express-validator')

class ValidationMiddleware {
    async login(req, res, next) {
        try {
            await check('email', 'Email is incorrect').isEmail().run(req);
            await check('password', 'Password less than 6').isLength({ min: 6 }).run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }
    async createUser(req, res, next) {
        try {
            await check('email', 'Email is incorrect').isEmail().run(req);
            await check('password', 'Password less than 6').isLength({ min: 6 }).run(req);
            await check('firstname', 'First name not found').notEmpty().run(req);
            await check('lastname', 'Last name not found').notEmpty().run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }
    async editUser(req, res, next) {
        try {
            await check('id', 'Id not found').notEmpty().run(req);
            await check('email', 'Email is incorrect').isEmail().run(req);
            await check('password', 'Password less than 6').isLength({ min: 6 }).run(req);
            await check('firstname', 'First name not found').notEmpty().run(req);
            await check('lastname', 'Last name not found').notEmpty().run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }
    async checkId(req, res, next) {
        try {
            await check('id', 'Id not found').notEmpty().run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }

    async createWorkplace(req, res, next) {
        try {
            await check('place_name', 'Place name not found').notEmpty().run(req);
            await check('x', 'PositionX not found').notEmpty().run(req);
            await check('y', 'PositionY not found').notEmpty().run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }
}

module.exports = new ValidationMiddleware()