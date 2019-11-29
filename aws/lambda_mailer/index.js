var aws = require("aws-sdk");
let nodemailer = require('nodemailer');
var ses = new aws.SES({region: 'eu-central-1'});


exports.handler = function (event, context, callback) {

     var params = {
        Destination: {
            ToAddresses: ["ingoigelstark@gmail.com"]
        },
        Message: {
            Body: {
                Text: { Data: "Test"}},
            Subject: { Data: "Test Email"
                
            }
        },
        Source: "ingoigelstark@gmail.com"
    };
    
    var rawparams = {
        Destinations: ["ingoigelstark@gmail.com"],
        RawMessage: {
            Data: "aasdasd"
            
        }, 
        
        
        Source: "ingoigelstark@gmail.com"
    };
    
   /* ses.sendRawEmail(rawparams,function(err,data){
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
    */
    
    
   /* ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });
    */
};