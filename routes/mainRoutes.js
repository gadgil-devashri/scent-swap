const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

// GET INDEX
router.get('/', controller.index);

// GET HOME
router.get('/home', controller.index);

// GET ABOUT
router.get('/about', controller.about);

// GET CONTACT
router.get('/contact', controller.contact);

module.exports = router;