const {body, check, validationResult, checkSchema} = require('express-validator')

const checkPassword = async (req) => {
    await checkSchema({
        password: {
            notEmpty: {errorMessage: 'The password field is required'},
            isLength: {
                options: { min: 6 },
                errorMessage: 'Password less than 6'
            },
            custom: {
                options: (value => !/\s/.test(value)),
                errorMessage: 'No spaces are allowed in the password'
            }
        }
    }).run(req)
}

const checkEmail = async (req) => {
    await checkSchema({
        email: {
            notEmpty: {errorMessage: 'The email field is required'},
            isEmail: {errorMessage: 'Email is incorrect'}
        }
    }).run(req)
}

const checkFullname = async (req) => {
    await checkSchema({
        firstname: {
            notEmpty: {errorMessage: 'The First name field is required'},
            custom: {options: (value => !/\s/.test(value)), errorMessage: 'Not spaces are allowed in the first name'}
        },
        lastname: {
            notEmpty: {errorMessage: 'The Last name field is required'},
            custom: {options: (value => !/\s/.test(value)), errorMessage: 'No spaces are allowed in the last name'}
        }
    }).run(req)
}

const checkId = async (req) => {
    await checkSchema({
        id: {
            notEmpty: {errorMessage: 'The id is required'}
        }
    }).run(req)
}

class ValidationMiddleware {
    async login(req, res, next) {
        try {
            await checkEmail(req);
            await checkPassword(req);
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
            await checkEmail(req);
            await checkPassword(req);
            await checkFullname(req);
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
            await checkId(req);
            await checkEmail(req)
            await checkPassword(req);
            await checkFullname(req);
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
            await checkId(req);
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
            await checkSchema({
                place_name: {
                    notEmpty:{errorMessage: 'The Place name field is required'},
                    custom: {options: (value => !/\s/.test(value)), errorMessage: 'No spaces are allowed in the place name'}
                }
            }).run(req);
            await check('x', 'The X field is required').notEmpty().run(req);
            await check('y', 'The Y field is required').notEmpty().run(req);
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