const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');


router.get('/admin', authController.getLoginPage);

router.post('/admin', authController.postLogin);


module.exports = router;