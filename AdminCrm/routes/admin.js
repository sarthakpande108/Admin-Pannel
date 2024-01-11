const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')


module.exports = (upload)=>{

    router.get('/', adminController.getAllAdmins);
    router.post('/addAdmin', upload.single('file'), adminController.addAdmin);
    router.post('/updateAdmin/:id', adminController.updateAdmin);
    router.post('/resetAdminPassword/:id', adminController.resetAdminPassword);
    router.post('/deleteAdmin/:id', adminController.deleteAdmin);

    return router;
}

