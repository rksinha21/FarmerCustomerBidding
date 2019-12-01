var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    ProductName:{
        type:String,
        required: true
    },
    Pid:{
        type:String,
        required: true
    },
    _id:{
        type: String,
        required: true
    },
    cid:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    }
});

itemSchema.set('collection', 'customerPreviousBid');

const Item = module.exports = mongoose.model('customerPreviousBid', itemSchema);
