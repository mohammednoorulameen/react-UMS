const express = require('express')
const admin_router = express.Router();
const AdminController = require('../Controllers/AdminController')
const upload = require('../Middleawares/Multer');


admin_router.post('/adminlogin',AdminController.AdminLogin)
admin_router.get('/getAdminDetailes',AdminController.getAdminDetails)
admin_router.get('/userList',AdminController.AdminGetUserList)
admin_router.get('/getEdituserDetails/:id',AdminController.GetEdituserDetails)
admin_router.put('/adminEdituser/:id',upload,AdminController.AdminEdituser)

module.exports = admin_router