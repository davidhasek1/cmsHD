const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


/* router.get('/about',controller.getAboutPage);

router.get('/services',controller.getServicesPage);

router.get('/contacts',controller.getContactPage);
router.post('/contacts', controller.postContacts); */

router.get('/', controller.getHomePage);

router.get('/contact-form', controller.getContactForm);

router.post('/contact-form', controller.postContactForm)


module.exports = router;