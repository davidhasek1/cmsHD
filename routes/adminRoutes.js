const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../isAuth/isAuth');

router. get('/cms', isAuth, adminController.getCMSPage);

router.get('/mailbox', isAuth, adminController.getMailBoxPage);
router.get('/mailbox/:msgId', isAuth, adminController.getMessagePage);

router.post('/delete-message',isAuth, adminController.deleteMsgPost);

router.post('/send-email',isAuth, adminController.postSendEmail);

//router ADD content

router.get('/help/how-show',isAuth, adminController.getHelpShow);
router.get('/help/how-add',isAuth, adminController.getHelpAdd);
router.get('/help/how-send',isAuth, adminController.getHelpSend);
router.get('/help/how-delete',isAuth, adminController.getHelpDelete);
router.get('/help',isAuth, adminController.getHelpPage);

router.get('/add-content',isAuth, adminController.getAddContentPage);

router.get('/users/add-user',isAuth, adminController.getAddUserPage);
router.post('/users/add-user',isAuth, adminController.postAddUser);
router.get('/users/:userId',isAuth, adminController.getUserPage);
router.post('/users/delete-user',isAuth, adminController.postDeleteUser);
router.get('/users',isAuth, adminController.getUsersPage);

module.exports = router;
