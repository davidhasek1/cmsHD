const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { check } = require('express-validator');

router.get('/', controller.getHomePage);

router.get('/contact-form', controller.getContactForm);

router.post('/contact-form',
    check('email')
    .isEmail()
    .withMessage('Formát emailu není správný'),
controller.postContactForm);

module.exports = router;
