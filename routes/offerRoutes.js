const express = require('express');
const router = express.Router();
const controller = require('../controllers/offerController');
const {isLoggedIn} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

// GET ALL items available for trading
router.get('/available/:ownerItem/:owner', isLoggedIn, controller.index);

// POST new offer
router.post('/',isLoggedIn, controller.create);

// DELETE a offer: reject / cancel
router.delete('/:id',validateId, isLoggedIn, controller.delete);

// GET offer details to manage offers
router.get('/manage/:item', isLoggedIn, controller.manage);

// Accept an offer
router.delete('/accept/:id',validateId, isLoggedIn, controller.acceptOffer);

module.exports = router;