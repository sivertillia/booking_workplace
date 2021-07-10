const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');
const userController = require('../controller/user.controller');
const workplaceController = require('../controller/workplace.controller');
const reservationController = require('../controller/reservation.controller');

const authMiddleware = require('../middleware/auth.middleware');
const validationMiddleware = require('../middleware/validation.middleware');
const {body,check} =  require('express-validator');

// Auth
router.post('/login', validationMiddleware.login, authController.login);
router.post('/admin/login', validationMiddleware.login, authController.loginAdmin);

// Users
router.post('/add_user', validationMiddleware.createUser, authMiddleware, userController.createUser);
router.put('/edit_user', validationMiddleware.editUser, authMiddleware, userController.editUser);
router.delete('/del_user', validationMiddleware.checkId, authMiddleware, userController.deleteUser);
router.get('/users', authMiddleware, userController.getUsers);

// Workplace
router.post('/add_workplace', validationMiddleware.createWorkplace, authMiddleware, workplaceController.createWorkplace);
router.delete('/del_workplace', validationMiddleware.checkId, authMiddleware, workplaceController.deleteWorkplace);
router.get('/workplaces', authMiddleware, workplaceController.getWorkplace);


module.exports = router;