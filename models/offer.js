const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    ownerItem: {type: Schema.Types.ObjectId, ref:'Trade'},
    tradeItem: {type: Schema.Types.ObjectId, ref:'Trade'},
    owner: {type: Schema.Types.ObjectId, ref:'User'},
    trader: {type: Schema.Types.ObjectId, ref:'User'},
    
});

// Collection name is offers in the database
module.exports = mongoose.model('Offer', offerSchema)