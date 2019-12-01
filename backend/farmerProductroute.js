const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('./farmerProductSchema');

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
    // console.log(req.body);
    let newItem = new Item({
        Sold:0,
        Fid:req.body.Fid,
        ProductName: req.body.ProductName,
        StartingBid: req.body.StartingBid,
        Quantity: req.body.Quantity,
        Unit: req.body.Unit,
        Location: req.body.Location,
        HeighestBid:req.body.HeighestBid
    });
    newItem.save((err)=>{
        if(err){
            console.log("err", err);
            res.json(err);
        }
        else{
            console.log("successfully");
            res.json({msg: 'hurray!! item added successfully'});
        }
    });
});

router.post('/itemupdate/:id', (req,res,next)=>{
    Item.findOneAndUpdate(
        {_id: req.params.id},
        {
         $set:{
            Sold:1
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


// mongodb+srv://SatyamAnand:<password>@farmerplot-xylad.mongodb.net/test?retryWrites=true&w=majority
