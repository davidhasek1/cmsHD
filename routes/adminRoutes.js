const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getLoginPage);

router.get('/cms', adminController.getCMSPage);

router.get('/mailbox', adminController.getMailBoxPage);

router.get('/mailbox/:msgId', adminController.getMessagePage);

router.post('/delete-message', adminController.deleteMsgPost);

router.post('/send-email', adminController.postSendEmail);

router.get('/help', adminController.getHelpPage);

module.exports = router;