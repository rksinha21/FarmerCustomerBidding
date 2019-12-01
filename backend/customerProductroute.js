const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('./customerProductSchema');


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
        Pid:req.body.Pid,
        ProductName: req.body.ProductName,
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        BidPlaced: req.body.BidPlaced,
        BidObtained:0,
        Fphn:req.body.Fphn
    });
    newItem.save((err)=>{
        if(err){
            console.log("err", err);
            res.json(err);
        }
        else{
            console.log("successfully yay!!");
            msg(newItem.Phone, newItem.BidPlaced, newItem.Fphn, newItem.Name, newItem.ProductName);
            res.json({msg: 'hurray!! item added successfully'});
        }
    });
});

router.post('/itemupdate/:id', (req,res,next)=>{
    Item.findOneAndUpdate(
        {_id: req.params.id},
        {
         $set:{
            __v:1
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

function msg(ph, bd, ph2, nm, pnm){
    console.log('sending message')
    var AWS = require('aws-sdk');
    AWS.config.region = 'us-east-1';
    var sns = new AWS.SNS();

    var params = {
        MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
           DataType: 'String',
           StringValue: 'Transactional'
          }
        },
      Message: (nm+' ने '+pnm+' खरीदना '+bd+' रूपये में तय किया है।उनसे जुड़ने के लिए '+ph+' पर संपर्क करें ।'),
      PhoneNumber: '+91'+ph2
    };
    sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
}
