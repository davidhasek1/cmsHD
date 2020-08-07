const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../isAuth/isAuth');
const Users = require('../models/users');
const { check, body } = require('express-validator');

router.get('/cms', isAuth, adminController.getCMSPage);

router.get('/mailbox', isAuth, adminController.getMailBoxPage);
router.get('/mailbox/:msgId', isAuth, adminController.getMessagePage);

router.delete('/mailbox/:msgId', isAuth, adminController.deleteMsg); //button

router.post('/send-email', isAuth, adminController.postSendEmail);

//router ADD content

router.get('/help/how-show-and-delete-msg', isAuth, adminController.getHelpShowDeleteMsg);
router.get('/help/how-send-msg', isAuth, adminController.getHelpSendMsg);
router.get('/help/how-add-image', isAuth, adminController.getHelpAddImage);
router.get('/help/how-show-and-delete-image', isAuth, adminController.getHelpShowDeleteImg);
router.get('/help/how-add-user', isAuth, adminController.getHelpAddUser);
router.get('/help/how-change-password', isAuth, adminController.getHelpChangePwd);
router.get('/help/how-delete-user', isAuth, adminController.getHelpDeleteUser);
router.get('/help', isAuth, adminController.getHelpPage);

router.get('/add-content', isAuth, adminController.getAddContentPage);
router.post('/add-content/img-visibility', adminController.postImgVisibility);
router.post('/add-content/delete-image', isAuth, adminController.postDeleteImage)

router.get('/add-content/add-form', isAuth, adminController.getAddContentForm);
router.post('/add-content/add-form', isAuth, adminController.postAddContent);

router.get('/users/add-user', isAuth, adminController.getAddUserPage);

router.post(
	'/users/add-user',
	isAuth,
	[
		check('email')
			.isEmail()
			.withMessage('Invalid email')
			.custom((value, { req }) => {
				return Users.findByEmail(value).then((userDoc) => {
					if (userDoc) {
						//není undefined
						return Promise.reject('Email exists already!!!');
					}
				});
			})
			/* .normalizeEmail() */, //odstraní WS, uppercases atd.
		body('password', 'Enter minimum 6 characters').isLength({ min: 6 }).trim(), //body kontroluje pouze definovaný segment

		body('confirm')
			.custom((value, { req }) => {
				//vrací true / false
				if (value !== req.body.password) {
					throw new Error('Password have to match');
				}
				return true;
			})
			.trim() //odstraní whitespace
	],
	adminController.postAddUser
);

router.get('/users/:userId', isAuth, adminController.getUserPage);

router.post(
	'/users/edit-user',
	isAuth,
	body('newpassword', 'Enter minimum 6 characters').isLength({ min: 6 }).trim(),
	body('confirmpassword').custom((value, { req }) => {
		if (value !== req.body.newpassword) {
			throw new Error('Passwords have to match');
		}
		return true;
	}).trim(),
	adminController.postEditUser
);

router.delete('/users/:userId', isAuth, adminController.DeleteUser); //button

router.get('/users', isAuth, adminController.getUsersPage);

module.exports = router;
