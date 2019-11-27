window.addEventListener("load", function(){

  getDevices();
    // [1] GET ALL THE HTML ELEMENTS
    var video = document.getElementById("vid-show"),
        canvas = document.getElementById("vid-canvas"),
        take = document.getElementById("vid-take");
  
    // [2] ASK FOR USER PERMISSION TO ACCESS CAMERA
    // WILL FAIL IF NO CAMERA IS ATTACHED TO COMPUTER
    navigator.mediaDevices.getUserMedia(
      { video : 
        { facingMode :
          { exact : "environment"}
        }
      })
    .then(function(_stream) {
      // [3] SHOW VIDEO STREAM ON VIDEO TAG
      video.srcObject = _stream;
      stream = _stream;

      video.play();
  
      // [4] WHEN WE CLICK ON "TAKE PHOTO" BUTTON
      take.addEventListener("click", function(){
        // Create snapshot from video
        var draw = document.createElement("canvas");
        draw.width = video.videoWidth;
        draw.height = video.videoHeight;
        var context2D = draw.getContext("2d");
        context2D.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        // Put into canvas container
        canvas.innerHTML = "";
        canvas.appendChild(draw);
      });
    })
    .catch(function(err) {
      document.getElementById("vid-controls").innerHTML = "Please enable access and attach a camera";
    });
  });

  async function getDevices(){
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    document.getElementById("debug").innerHTML = devices;
  }

 let switchBtn = document.querySelector("#switch-cam-btn");
 let stream = null;

 switchBtn.addEventListener('click', function(){
    if( stream == null ) return
    // we need to flip, stop everything
    stream.getTracks().forEach(t => {
      t.stop();
    });
    // toggle / flip
    shouldFaceUser = !shouldFaceUser;
    capture();
  })