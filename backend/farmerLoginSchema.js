var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type:Number,
        required: true
    },
    Password:{
        type:String,
        required: true
    }
});

itemSchema.set('collection', 'farmerLogin');

const Item = module.exports = mongoose.model('farmerLogin', itemSchema);
