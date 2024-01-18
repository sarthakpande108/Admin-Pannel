const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')


module.exports = (upload)=>{

    router.get('/', adminController.getAllAdmins);
    router.post('/addAdmin', upload.single('file'), adminController.addAdmin);
    router.post('/updateAdmin/:id',upload.single('file'), adminController.updateAdmin);
    router.post('/verifyAdminPassword/:id', adminController.verifyAdminPassword);
    router.post('/resetAdminPassword/:id', adminController.resetAdminPassword);
    router.post('/deleteAdmin/:id', adminController.deleteAdmin);

    return router;
}


