// camera stream video element
let videoElm = document.querySelector('#camera-stream');
// flip button element
let flipBtn = document.querySelector('#flip-btn');

let imageBtn1 = document.querySelector('#image-btn-1');

// default user media options
let defaultsOpts = 
{ audio: false, 
  video: 
  { 
    mandatory: { minAspectRatio: 1.333, maxAspectRatio: 1.334 }}}
let shouldFaceUser = true;

// check whether we can use facingMode

let supports = navigator.mediaDevices.getUserMedia(defaultsOpts);
if( supports['facingMode'] === true ) {
  flipBtn.disabled = false;
}

let stream = null;


function capture() {
  defaultsOpts.video = { facingMode: shouldFaceUser ? 'user' : 'environment' }
  navigator.mediaDevices.getUserMedia(defaultsOpts)
    .then(function(_stream) {
      stream  = _stream;
      videoElm.srcObject = stream;
      videoElm.play();
     

    })
    .catch(function(err) {
      console.log(err)
    });
}

flipBtn.addEventListener('click', function(){
  if( stream == null ) return
  // we need to flip, stop everything
  stream.getTracks().forEach(t => {
    t.stop();
  });
  // toggle / flip
  shouldFaceUser = !shouldFaceUser;
  capture();
})

imageBtn1.addEventListener('click', function(){
  var canvas = document.getElementById('canvas_1');
  var context = canvas.getContext('2d');

  

  context.drawImage(videoElm,0,0,640,480);
 
  
});


capture();