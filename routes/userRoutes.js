const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');

const router = express.Router();

router.get('/new', isGuest, controller.new);
router.get('/login',isGuest, controller.login);
router.get('/profile',isLoggedIn, controller.profile);

router.post('/',isGuest, controller.create);
router.post('/login',isGuest, controller.verify);

router.get('/logout',isLoggedIn, controller.logout);

module.exports = router;