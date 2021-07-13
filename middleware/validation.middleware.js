const {body, check, validationResult} = require('express-validator')

class ValidationMiddleware {
    async login(req, res, next) {
        try {
            await check('email', 'Email is incorrect').isEmail().run(req);
            await check('password', 'The password field is required').notEmpty().run(req);
            await check('password', 'Password less than 6').isLength({ min: 6 }).run(req);
            await check('password', 'No spaces are allowed in the password').custom(value => !/\s/.test(value)).run(req);
            const errors = validationResult(req);
            console.log({error: errors.array() })
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
            await check('password', 'The password field is required').notEmpty().run(req);
            await check('password', 'Password less than 6').isLength({ min: 6 }).run(req);
            await check('password', 'No spaces are allowed in the password').custom(value => !/\s/.test(value)).run(req);
            await check('firstname', 'First name not found').notEmpty().run(req);
            await check('lastname', 'Last name not found').notEmpty().run(req);
            const errors = validationResult(req);
            console.log({error: errors.array() })
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
            await check('password', 'No spaces are allowed in the password').custom(value => !/\s/.test(value)).run(req);
            await check('firstname', 'First name not found').notEmpty().run(req);
            await check('lastname', 'Last name not found').notEmpty().run(req);
            const errors = validationResult(req);
            console.log({error: errors.array() })
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
            console.log({error: errors.array() })
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
            console.log({error: errors.array() })
            if (!errors.isEmpty()) return res.status(400).json({error: errors.array()[0]['msg']});
            next()
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: "Error"})
        }
    }
    async isValidDate(req, res, next) {
        try {
            const {date} = req.query;
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            if (!date.match(regEx)) return res.status(400).json({error: "Invalid format"});  // Invalid format
            var d = new Date(date);
            var dNum = d.getTime();
            if(!dNum && dNum !== 0) return res.status(400).json({error: "Invalid date"}); // NaN value, Invalid date
            // return d.toISOString().slice(0,10) === dateString;
            next();
        } catch (e) {
            console.log(e);
            return res.status(400).json({error: "Error"})
        }
      }
}

module.exports = new ValidationMiddleware()