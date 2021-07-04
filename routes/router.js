const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');
const userController = require('../controller/user.controller');

const authMiddleware = require('../middleware/auth.middleware');

//Auth
router.post('/login', authController.login);
router.post('/admin/login', authController.loginAdmin);

router.post('/add_user', userController.createUser);
router.post('/del_user', authMiddleware, userController.deleteUser);
router.get('/users', authMiddleware, userController.getUsers);
module.exports = router;