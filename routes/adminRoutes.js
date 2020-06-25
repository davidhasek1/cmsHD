const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getLoginPage);

router.get('/cms', adminController.getCMSPage);

router.get('/mailbox', adminController.getMailBoxPage);

module.exports = router;