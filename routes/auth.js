const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.get('/admin', authController.getLoginPage);

router.post('/admin', authController.postLogin);

router.post('/logout', authController.postLogout);



router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassPage);
router.post('/reset/new-password', authController.postNewPassword);


//tady bude post route odeslaní registrace

module.exports = router;