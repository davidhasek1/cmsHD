const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {check} = require('express-validator');

router.get('/admin', authController.getLoginPage);

router.post('/admin', check('email').isEmail().withMessage('Invalid Email') , authController.postLogin);

router.post('/logout', authController.postLogout);



router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassPage);
router.post('/reset/new-password', authController.postNewPassword);


module.exports = router;