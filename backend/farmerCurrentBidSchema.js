var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    ProductName:{
        type:String,
        required: true
    },
    _id:{
        type: String,
        required: true
    },
    fid:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    }
});

itemSchema.set('collection', 'farmerCurrentBid');

const Item = module.exports = mongoose.model('farmerCurrentBid', itemSchema);
