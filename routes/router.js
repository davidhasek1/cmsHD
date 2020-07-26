const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


/* router.get('/about',controller.getAboutPage);

router.get('/services',controller.getServicesPage);

router.get('/contacts',controller.getContactPage);
router.post('/contacts', controller.postContacts); */

router.get('/', controller.getHomePage);

module.exports = router;