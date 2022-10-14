const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');

// GET ALL TRADES
router.get('/', controller.index);

//GET New Trade Form
router.get('/new', controller.new)

// GET details of particulatar trade
router.get('/:id', controller.show);

// POST new trade details
router.post('/', controller.create);

// DELETE a trade
router.delete('/:id', controller.delete);

module.exports = router;