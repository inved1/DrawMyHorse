let sendBtn = document.querySelector('#send-btn');
let canvas1 = document.getElementById('canvas_1');

let mycustomernr = GetURLParameter('id');
let myhorsenr = GetURLParameter('horsenr');
let myimagenr = GetURLParameter('imagenr');

let myRegion = 'us-east-1'

AWS.config.update({region:myRegion});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:77143dca-29cb-4f9f-8ed4-1a9ae5f9fcf2'});


let lambda = new AWS.Lambda({region: myRegion, apiVersion: '2015-03-31'});

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function popup(){
  $("#dialog").dialog({
    modal: true,
    title: "Evax Photo App",
    width: 300,
    height: 150,
    
    open: function (event, ui) {
        setTimeout(function () {
            $("#dialog").dialog("close");
        }, 10000);
    }
  });
}



sendBtn.addEventListener('click', function(){
    var context = canvas1.getContext('2d');

    //var imgData = context.getImageData(0,0,640,480);
    let dataURL1 = canvas1.toDataURL("image/png");
    
    if (canvas1.toBlob) {
      canvas1.toBlob(function(blob) {

      

      var params = {
        FunctionName: 'ingoigelstark-sendmail', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({
          image:dataURL1,
          customer:mycustomernr,
          imagenr:myimagenr,
          horsenr:myhorsenr
        })
      };

      popup();

      var returndata;
      
      lambda.invoke(params, function(err, data) {
        console.log(data);
          if (err) {
            console.log('err: --- ' + err);
          } else {

            if(sendBtn.getAttribute('data-name') != null) {
              myimagenr = sendBtn.getAttribute('data-name').replace(/ /g,'_');
            }

            document.location.replace(sendBtn.getAttribute('data-nextpage') + `?id=`+mycustomernr+`&horsenr=`+myhorsenr+`&imagenr=`+myimagenr+`` );
            returndata = JSON.parse(data);
            var log = JSON.stringify(returndata);
            console.log('ok: --- ' +log);
            
          }
        })

      }, 'image/jpeg')
    }

    
    //console.log(sendBtn.getAttribute('data-nextpage'));

       
    

  });
