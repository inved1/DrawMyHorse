let sendBtn = document.querySelector('#send-btn');
let canvas = document.getElementById('canvas');



let myRegion = 'us-east-1'

AWS.config.update({region:myRegion});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:77143dca-29cb-4f9f-8ed4-1a9ae5f9fcf2'});


let lambda = new AWS.Lambda({region: myRegion, apiVersion: '2015-03-31'});




sendBtn.addEventListener('click', function(){
    var context = canvas.getContext('2d');

    //var imgData = context.getImageData(0,0,640,480);
    let dataURL = canvas.toDataURL("image/png");


    
    var params = {
        FunctionName: 'ingoigelstark-sendmail', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: {img: dataURL}
      };
    
    lambda.invoke(params, function(err, data) {
        if (err) {
          console.log('err: --- ' + err);
        } else {
          console.log(data.Payload);
        }
      })

  });
