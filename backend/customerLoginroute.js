const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('./customerLoginSchema');

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
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Password: req.body.Password
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
        {
         $set:{
            Name: req.body.Name,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: req.body.Password
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
