const express = require('express');
const userRouter = express.Router();
const auth = require("../middleware/auth")
const deviceController = require('../controller/deviceController');
const userController = require('../controller/userController');


userRouter.get('/', userController.getAllUser);
userRouter.get('/currentuser', auth, userController.getCurrentUser);
userRouter.get('/:userId', auth, userController.getUserAndDevices)
userRouter.post('/login', userController.login);
userRouter.post('/logout', auth, userController.logout);
userRouter.post('/', userController.Signup);
userRouter.post('/:userId/devices', auth, deviceController.createDeviceByUserId)

module.exports = userRouter;
