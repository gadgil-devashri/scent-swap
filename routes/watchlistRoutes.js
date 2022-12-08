const express = require('express');
const router = express.Router();
const controller = require('../controllers/watchlistController');
const {isLoggedIn} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

// POST new watchlist item
router.post('/:id',isLoggedIn, controller.create);
// DELETE a wathlist item
router.delete('/:id',validateId, isLoggedIn, controller.delete);

module.exports = router;