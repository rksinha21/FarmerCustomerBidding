var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Sold:{
        type:Number,
        required:false
    },
    Fid:{
        type:String,
        required: false
    },
    ProductName:{
        type:String,
        required: true
    },
    StartingBid:{
        type: Number,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    Unit:{
        type: String,
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    HeighestBid:{
        type:Number,
        required:false
    }
});

itemSchema.set('collection', 'farmerProduct');

const Item = module.exports = mongoose.model('farmerProduct', itemSchema);
