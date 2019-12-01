const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('./farmerCurrentBidSchema');

router.get('/item',(req, res, next)=>{
    Item.find((err,items)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(items)
        }
    });
});


router.post('/itempost',(req, res, next)=>{
    let newItem = new Item({
        ProductName: req.body.ProductName,
        _id: req.body._id,
        fid: req.body.fid,
        Price: req.body.Price
    });
    newItem.save((err)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({msg: 'hurray!! item added successfully'});
        }
    });
});

router.post('/itemupdate/:id', (req,res,next)=>{
    Item.findOneAndUpdate(
        {_id: req.params.id},
        {
         $set:{
            ProductName: req.body.ProductName,
            _id: req.body._id,
            fid :req.body.fid,
            Price: req.body.Price
        }},
        (err, result)=>{
            if(err){
                res.json(err);
            }
            else{
                res.json(result);
            }
        }
    )
});

router.post('/itemdelete/:id',(req, res, next)=>{
    Item.remove({
        _id: req.params.id
    },(err, results)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({msg: 'Betta Delete ho gaya nikal ab!'});
        }
    });
});

module.exports = router;
