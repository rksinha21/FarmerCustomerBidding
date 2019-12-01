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
  Message: 'There will be no college on monday',
  PhoneNumber: '+917541802725'
};


sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});

