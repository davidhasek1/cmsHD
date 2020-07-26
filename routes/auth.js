const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {check, body} = require('express-validator');

router.get('/admin', authController.getLoginPage);

router.post('/admin',
[
    check('email').isEmail().withMessage('Invalid Email'),
    body('password', 'Invalid email or password').isLength({min:6})

]
 , authController.postLogin);

router.post('/logout', authController.postLogout);



router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);    //zvalidovat!!

router.get('/reset/:token', authController.getNewPassPage);
router.post('/reset/new-password',
[
    body('password', 'Enter minimum 6 characters').isLength({min: 6}),
    body('confirm').custom((value, {req}) => {  //value parametr obsahuje confirm!
        if(value !== req.body.password){
            throw new Error('Passwords have to match');
        }
        return true;
    })
]
,authController.postNewPassword);


module.exports = router;