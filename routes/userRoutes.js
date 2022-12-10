const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {logInLimiter} = require('../middlewares/rateLimiters');
const { validateSignup, validateLogin, validateResults} = require('../middlewares/validator');

const router = express.Router();

router.get('/new', isGuest, controller.new);
router.get('/login',isGuest, controller.login);
router.get('/profile',isLoggedIn, controller.profile);

router.post('/',isGuest,validateSignup,validateResults, controller.create);
router.post('/login',logInLimiter, isGuest,validateLogin,validateResults, controller.verify);

router.get('/logout',isLoggedIn, controller.logout);

module.exports = router;