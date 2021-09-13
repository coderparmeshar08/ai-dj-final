scoreRightWrist = 0; scoreLeftWrist = 0;


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    
}
function modelLoaded(){
    console.log('Posenet is Intialized');
    poseNet.on('pose' , gotPoses);
    
}
function draw(){
    image(video, 0, 0,600, 500);
}
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
 song  = loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
   }

   function gotPoses(results)
   {
       if(results.length > 0)
       {
       console.log(results);
       scoreRightWrist = results[0].pose.keypoints[10].score;
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist" + scoreLeftWrist)

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log(" rightWristX" +  rightWristX + " rightWristY" +  rightWristY);///// capital W in poses in capitals
       }
   }
   ///a score is used "to calculate whether hand is perfectly detecd if the score is 0 then it will not work and if its more than 0 then it will only work "
   function draw() {/// it will make a webcam on the canvas eg h=600 w=500
       image(video, 0, 0, 600, 500);

       fill("red");
       stroke("red");

       if(scoreLeftWrist > 0.2)
       {
           circle(leftWristX,leftWristY,20);
           InNumberleftWristY = Number(leftWristY);
           remove_decimals = floor(InNumberleftWristY);
           volume = remove_decimals/500;
           document.getElementById("volume").innerHTML = "Volume =" + volume;
           song.setVolume(volume);
       }
   
   if(scoreRightWrist > 0.1)
   {
   circle(rightWristX,rightWristY,20);
    if(rightWristY > 0 && rightWristY<= 100)
    {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY<= 200)
    {
      document.getElementById("speed").innerHTML = "Speed = 1x"
      song.rate(1);
    }
    else if(rightWristY >200 && rightWristY<= 300)
    {
      document.getElementById("speed").innerHTML = "Speed = 1.5x"
      song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY<= 400)
    {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    }
    else if(rightWristY >400 && rightWristY<= 500)
    {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    }
}
   }