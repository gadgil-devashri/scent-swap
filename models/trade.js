const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    category: {type: String, required: [true, 'Category is required']},
    company: {type: String, required: [true, 'Company is required']},
    type: {type: String, required: [true, 'Type is required']},
    original_net_weight: {type: String, required: [true, 'original_net_weight is required']},
    existing_net_weight: {type: String, required: [true, 'existing_net_weight is required']},
    original_price: {type: String, required: [true, 'original_price is required']},
    status: {type: String, default:'available'},
    image: {type: String, required: [true, 'image is required']},
    details: {type: String, required: [true, 'Details field is required'],
              minlength:[10, 'Details field should have atleast 10 characters']},
    createdBy: {type: Schema.Types.ObjectId, ref:'User'},
},
{
    timestamps:true
}
);

// Collection name is trades in the database
module.exports = mongoose.model('Trade', tradeSchema)
