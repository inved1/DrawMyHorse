let mandatoryBtn = document.getElementById('mandatory-btn');

let add1Btn = document.getElementById('add1-btn');
let add2Btn = document.getElementById('add2-btn');
let add3Btn = document.getElementById('add3-btn');
let add4Btn = document.getElementById('add4-btn');
let add5Btn = document.getElementById('add5-btn');
let add6Btn = document.getElementById('add6-btn');
let add7Btn = document.getElementById('add7-btn');
let add8Btn = document.getElementById('add8-btn');


let mycustomernr = GetURLParameter('id');
let myhorsenr = GetURLParameter('horsenr');
let myimagenr = parseInt(GetURLParameter('imagenr'));

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

[add1Btn, add2Btn, add3Btn,add4Btn,add5Btn,add6Btn,add7Btn,add8Btn].forEach(item => {
    
    var myImageType = item.getAttribute('data-name').replace(/ /g,'_');

    item.addEventListener('click', function(){
        document.location.replace(item.getAttribute('data-nextpage') + `?id=`+mycustomernr+`&horsenr=`+myhorsenr+`&imagenr=`+myImageType+`` )
    });
    
});


mandatoryBtn.addEventListener('click', function(){
    var myImageType = mandatoryBtn.getAttribute('data-name').replace(/ /g,'_');
    document.location.replace(mandatoryBtn.getAttribute('data-nextpage') + `?id=`+mycustomernr+`&horsenr=`+myhorsenr+`&imagenr=`+myImageType+`` );
  });