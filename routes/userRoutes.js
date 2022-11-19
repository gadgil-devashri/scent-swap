const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.get('/new', controller.new);
router.get('/login', controller.login);
router.get('/profile', controller.profile);

router.post('/', controller.create);
router.post('/login', controller.verify);

router.get('/logout', controller.logout);

module.exports = router;