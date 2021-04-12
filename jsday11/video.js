//here we are targetting all the required tags 
const player = document.querySelector('.player');
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progress_fill = player.querySelector(".progress__filled");
const toggle =player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider")
const skipbtn =player.querySelectorAll("[data-skip]");
//function performed with certain events
const toggle_play=function(){
   const val = video.paused ?'play':'pause' //here the value is decided if the video is paused
   video[val]();                            //depending on that we call video.play or video.pause
   console.log("hey");
} 
const updatebtn=function(){
    const icon = this.paused? '►' : '❚ ❚';   //here the icon is decided if the video is paused
    console.log(this);  // to check it we get video tag 
    toggle.textContent=icon; //depending of the icon we set the text content to the related to icons
    //generally used in buttons to change value of the button
}
const skip = function(){
    console.log(this.dataset.skip); // here we are checking the data attribute skip;
    video.currentTime+=parseFloat(this.dataset.skip);//this will update the videos current time
}
const updaterange =function(){
    console.log(this.value) //here we check the value and the name from input range tag 
    console.log(this.name)
    video[this.name]=this.value; //depending on name and value video attribute changes like volume and olayback speed
}
const updateprogress=function(){
    //we are updating the prgress bar 
    const width = (video.currentTime/video.duration)*100; //we set the width here using the operation
    progress_fill.style.flexBasis=`${width}%`; // in style tag we are updating flex basis with width dynamically
}
const scrub =function(e){
    console.log(e.offsetX) // offsetX property tells whats the current value in x direction
    const scrubtime = (e.offsetX/progress.offsetWidth)*video.duration; // scrub is like moving mouse or clicking to 
    video.currentTime=scrubtime;                                       //change the video time so we are updating currtym
}


// we are adding event to all the targetted tags 

let down=false;// generally dealt with mouse events see from 53 line
video.addEventListener("click",toggle_play);
video.addEventListener('play',updatebtn);
video.addEventListener('pause',updatebtn);
toggle.addEventListener("click",toggle_play);
skipbtn.forEach(btn=>btn.addEventListener('click',skip))
ranges.forEach(range=>range.addEventListener("change",updaterange))
video.addEventListener("timeupdate",updateprogress)
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",(e)=>down&&scrub(e));
progress.addEventListener("mousedown",()=>down=true);//in this case only scrub function works 
progress.addEventListener("mouseup",()=>down=false);