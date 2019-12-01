const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const farmerProductroute = require('./farmerProductroute');
const customerProductroute = require('./customerProductroute');
const farmerPreviousBidroute = require('./farmerPreviousBidroute');
const farmerCurrentBidroute = require('./farmerCurrentBidroute');
const farmerLoginroute = require('./farmerLoginroute');
const customerLoginroute = require('./customerLoginroute');
const customerPreviousBidroute = require('./customerPreviousBidroute');
const customerCurrentBidroute = require('./customerCurrentBidroute');


var app = express();
app.use(express.static('./public'));

const port = 3000;

mongoose.connect('mongodb://localhost:27017/FarmerPlot',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected',()=>{
    console.log('connected');
});

mongoose.connection.on('error',(err)=>{
    console.log(err);
});

app.use(cors());

app.use(bodyParser.json());

app.use('/farmerProduct',farmerProductroute);
app.use('/customerProduct',customerProductroute);
app.use('/farmerPreviousBid',farmerPreviousBidroute);
app.use('/farmerCurrentBid',farmerCurrentBidroute);
app.use('/farmerLogin',farmerLoginroute);
app.use('/customerPreviousBid',customerPreviousBidroute);
app.use('/customerCurrentBid',customerCurrentBidroute);
app.use('/customerLogin',customerLoginroute);

app.listen(port,()=>{
    console.log('Server has been started on port: '+port);
});
