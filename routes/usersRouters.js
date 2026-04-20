const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

const { registerRules, loginRules, validate } = require('../middlewares/validate');


userRouter.get('/auth/login',userController.authLogin);
userRouter.get('/auth/register',userController.authRegister);


userRouter.post('/auth/register', registerRules, validate, userController.registerUser);
userRouter.post('/auth/login', loginRules, validate, userController.loginUser);

userRouter.get('/auth/logout', userController.logOut);



module.exports = userRouter;




