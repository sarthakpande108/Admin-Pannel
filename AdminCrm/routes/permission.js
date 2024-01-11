const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController')

router.get('/', permissionController.getAllPermissions);
router.post('/addPermission', permissionController.addPermission);
router.post('/deletePermission/:id', permissionController.deletePermission);

module.exports = router
