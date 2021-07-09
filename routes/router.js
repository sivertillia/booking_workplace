const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');
const userController = require('../controller/user.controller');
const reservationController = require('../controller/reservation.controller');

const authMiddleware = require('../middleware/auth.middleware');
const validationMiddleware = require('../middleware/validation.middleware');
const {body,check} =  require('express-validator');

//Auth
router.post('/login', validationMiddleware.login, authController.login);
router.post('/admin/login', validationMiddleware.login, authController.loginAdmin);

router.post('/add_user', validationMiddleware.createUser, authMiddleware, userController.createUser);
router.put('/edit_user', validationMiddleware.editUser, authMiddleware, userController.editUser);
router.delete('/del_user', authMiddleware, userController.deleteUser);
router.get('/users', authMiddleware, userController.getUsers);

//Testing
router.delete('/rem', reservationController.removeReservation);
module.exports = router;