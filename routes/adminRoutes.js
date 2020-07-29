const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../isAuth/isAuth');
const { check, body } = require('express-validator');

router.get('/cms', isAuth, adminController.getCMSPage);

router.get('/mailbox', isAuth, adminController.getMailBoxPage);
router.get('/mailbox/:msgId', isAuth, adminController.getMessagePage);

router.post('/delete-message', isAuth, adminController.deleteMsgPost);	//button 

router.post('/send-email', isAuth, adminController.postSendEmail);

//router ADD content

router.get('/help/how-show', isAuth, adminController.getHelpShow);
router.get('/help/how-add', isAuth, adminController.getHelpAdd);
router.get('/help/how-send', isAuth, adminController.getHelpSend);
router.get('/help/how-delete', isAuth, adminController.getHelpDelete);
router.get('/help', isAuth, adminController.getHelpPage);

router.get('/add-content', isAuth, adminController.getAddContentPage);

router.get('/add-content/add-form', isAuth, adminController.getAddContentForm);

router.get('/users/add-user', isAuth, adminController.getAddUserPage);

router.post(
	'/users/add-user',
	isAuth,
	[
		check('email').isEmail().withMessage('Invalid email'), //check kontroluje vše ..cookies,headers,body, params atd.
		body('password', 'Enter minimum 6 characters').isLength({ min: 6 }), //body kontroluje pouze definovaný segment
		body('confirm').custom((value, { req }) => {
			//vrací true / false
			if (value !== req.body.password) {
				throw new Error('Passwords have to match');
			}
			return true;
		})
	],
	adminController.postAddUser
);

router.get('/users/:userId', isAuth, adminController.getUserPage);

router.post(
	'/users/edit-user',
	isAuth,
	body('newpassword', 'Enter minimum 6 characters').isLength({ min: 6 }),
    body('confirmpassword').custom((value, { req }) => {
		if (value !== req.body.newpassword) {
			throw new Error('Passwords have to match');
        }
        return true;
	}),
	adminController.postEditUser
);

router.post('/users/delete-user', isAuth, adminController.postDeleteUser);	//button
router.get('/users', isAuth, adminController.getUsersPage);

module.exports = router;
