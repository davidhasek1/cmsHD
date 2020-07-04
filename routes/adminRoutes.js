const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/cms', adminController.getCMSPage);

router.get('/mailbox', adminController.getMailBoxPage);
router.get('/mailbox/:msgId', adminController.getMessagePage);

router.post('/delete-message', adminController.deleteMsgPost);

router.post('/send-email', adminController.postSendEmail);

//router ADD content

router.get('/help', adminController.getHelpPage);
router.get('/help/how-delete', adminController.getHelpDelete);
router.get('/help/how-send', adminController.getHelpSend);
router.get('/help/how-add', adminController.getHelpAdd);
router.get('/help/how-show', adminController.getHelpShow);

router.get('/add-content', adminController.getAddContentPage);

router.get('/users', adminController.getUsersPage);
router.get('/users/:userId', adminController.getUserPage);
router.post('/users/delete-user', adminController.postDeleteUser);

module.exports = router;
