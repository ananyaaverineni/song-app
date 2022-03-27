song=""
left_wristscore=0
right_wristscore=0
left_wristx=0
right_wristx=0
left_wristy=0
right_wristy=0;
function preload(){
  song=loadSound("music.mp3") 
}
function setup(){
 canvas=createCanvas(600,500)
 canvas.center();
 video=createCapture(VIDEO);
 video.hide()
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose',gotposes);
}
function gotposes(result){
if(result.length>0){
console.log(result) 
left_wristscore=result[0].pose.keypoints[9].score
right_wristscore=result[0].pose.keypoints[10].score
left_wristx=result[0].pose.leftWrist.x
left_wristy=result[0].pose.leftWrist.y
right_wristy=result[0].pose.rightWrist.y
right_wristx=result[0].pose.rightWrist.x
}
}
function modelLoaded(){    
console.log('PoseNet Is Initialized');
}
function draw(){
image(video,0,0,600,500)
fill("#b22222")
stroke("#b22222")
if(right_wristscore>0.2){
circle(right_wristx,right_wristy,30)  
if(right_wristy>0 && right_wristy<=100){
  document.getElementById("speed").innerHTML="speed=0.5x"
  song.rate(0.5)  
  
}
else if(right_wristy>100 && right_wristy<=200){
  document.getElementById("speed").innerHTML="speed=1x"
  song.rate(1)  
}
else if(right_wristy>200 && right_wristy<=300){
  document.getElementById("speed").innerHTML="speed=1.5x"
  song.rate(1.5)  
}
else if(right_wristy>300 && right_wristy<=400){
  document.getElementById("speed").innerHTML="speed=2x"
  song.rate(2)  
}
else if(right_wristy>400){
  document.getElementById("speed").innerHTML="speed=2.5x"
  song.rate(2.5)  
}
}
if(left_wristscore > 0.2){
  circle(left_wristx,left_wristy,20) 
  numerical_left_wristy=Number(left_wristy);
  numerical_left_wristy=floor(numerical_left_wristy)
  volume=numerical_left_wristy/500;
  document.getElementById("volume").innerHTML="volume="+volume
  song.setVolume(volume);
  
}
}
function play(){
song.play();
song.setVolume(1)
song.rate(1)  
}