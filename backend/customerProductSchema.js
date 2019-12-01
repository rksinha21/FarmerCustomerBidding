var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Pid:{
        type:String,
        required: false
    },
    ProductName:{
        type:String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    BidPlaced:{
        type:Number,
        required:true
    },
    BidObtained:{
        type:Number,
        required:true
    },
    Fphn:{
        type:Number,
        required:false
    }
});

itemSchema.set('collection', 'customerProduct');

const Item = module.exports = mongoose.model('customerProduct', itemSchema);
