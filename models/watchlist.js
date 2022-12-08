const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    tradeId: {type: Schema.Types.ObjectId, ref:'Trade'},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
});

// Collection name is watchlists in the database
module.exports = mongoose.model('Watchlist', watchlistSchema)