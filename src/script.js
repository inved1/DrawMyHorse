// camera stream video element
let videoElm = document.querySelector('#camera-stream');
// flip button element
let flipBtn = document.querySelector('#flip-btn');

let imageBtn = document.querySelector('#image-btn');

// default user media options
let defaultsOpts = { audio: false, video: { facingMode: { exact: "environment" } } }
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

imageBtn.addEventListener('click', function(){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  context.drawImage(videoElm,0,0,640,480);
});

capture();