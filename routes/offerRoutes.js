const express = require('express');
const router = express.Router();
const controller = require('../controllers/offerController');
const {isLoggedIn} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

// GET ALL items available for trading
router.get('/:ownerItem/:owner', isLoggedIn, controller.index);

// POST new trade details
router.post('/',isLoggedIn, controller.create);

// DELETE a trade
router.delete('/:id',validateId, isLoggedIn, controller.delete);

module.exports = router;