const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');
const {isLoggedIn, isOwner} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');


// GET ALL TRADES
router.get('/', controller.index);

//GET New Trade Form
router.get('/new',isLoggedIn, controller.new)

// GET details of particulatar trade
router.get('/:id',validateId, controller.show);

// POST new trade details
router.post('/',isLoggedIn, controller.create);

// DELETE a trade
router.delete('/:id',validateId, isLoggedIn,isOwner, controller.delete);

// Update existing trade
router.put('/:id',validateId, isLoggedIn,isOwner, controller.update);

// Edit an existing trade
router.get('/:id/edit',validateId, isLoggedIn,isOwner, controller.edit)

module.exports = router;