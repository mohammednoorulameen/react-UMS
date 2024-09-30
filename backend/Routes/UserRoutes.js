const express = require('express')
const user_router = express.Router();
const UserController = require('../Controllers/UserController');
const upload = require('../Middleawares/Multer');
const UserAuth = require("../Middleawares/UserAuth");



user_router.post('/api/users/register',upload,UserController.Register)
user_router.post('/api/users/login',UserController.UserLogin)

user_router.get('/userHome',UserController.userHome)

// user_router.post('/api/users/logout', UserController.userLogout)

user_router.put('/userEditProfile',upload,UserController.userUpdateProfile)


module.exports  = user_router;