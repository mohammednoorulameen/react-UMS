const express = require('express')
const admin_router = express.Router();
const AdminController = require('../Controllers/AdminController')



admin_router.post('/adminlogin',AdminController.AdminLogin)


module.exports = admin_router