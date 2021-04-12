const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');                            //all the required tags are targetted
const strip = document.querySelector('.strip');
const ding = document.querySelector('.ding');

//webcam feature starts

function getvideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) //NMG is the way to get the web cam from user 
        .then(stream => {                          //it returns promise if success we console.log the raw data
            console.log(stream);         //but to display the video/webcam live  we need to format it in URL form so we 
            video.srcObject = stream;         //use srcObject to make it in a URL form
            video.play();                  //finally we use video.play to play the live video in right side corner 
        })
        .catch((err) => {
            console.log("oh no", err);   //if error occur we display it by catch 
        })
}
getvideo();  //running get video for testing 


function paintToCanvas() {   //to display webcame live in a specified canvas with videos actual height and width

    const width = video.videoWidth;       //getting actual height and width of video
    const height = video.videoHeight;
    canvas.width = width;        //setting the canvas width and height accordingly 
    canvas.height = height;
    return setInterval(() => {           //by setintertval method we are drawing the recieved video's image in after every 16milli sec 
        ctx.drawImage(video, 0, 0, width, height);     //here we are drawing the image recieved in canvas
        let pixels = ctx.getImageData(0, 0, width, height) //here we are getting the canvas image to make some effect
        // console.log(pixels)
        // debugger;
        // pixels = redeffect(pixels)  //here redeffect is called
        // console.log(hola);
        pixels = rgbsplit(pixels) // we are calling rgb split to make some changes in the pixels thats is the image we get from canvas
        ctx.globalAlpha=0.8;  
        // pixels = greenscreen(pixels)
        ctx.putImageData(pixels, 0, 0);  //after we get the changed pixels we put it back in the canvas
    }, 16);
}


//very important feature to take photo and download  feature 
function takephoto() {
    ding.currentTime = 0;   //i have an audio to be played wen photo is taken  so i made ding.play() to produce audio
    ding.play();        //and currentTime=0 if the photo is taken continuously so as to produce audio frequently.

    const data = canvas.toDataURL('image/jpeg') //this todataurl function converts the thing present in canvas to image with jpeg type .u can change the type

    const link = document.createElement('a'); //we are creting anchor element
    link.href = data; //setting href part to be the data we get
    link.setAttribute('Download', 'handsome'); // we set download attribute in anchor tag  and its downloaded by name handsome 
    link.innerHTML = `<img src="${data}" alt="handsom-man">`; //we are showing the captured image in html 
    // strip.insertBefore(link,strip.firstChild);
    strip.insertAdjacentElement('afterbegin', link) //this link elemnt is inserted after strip parent element
}







/*here we are going to play with pixels. In pixels if we console ,it shows an array of a very very big size ,
it is inside pixels ->data. in that data the first index is red ,second is green , third is blue ,fourth is alpha
it is repeted on and on present in our canvas . so to make some intersting effect we change the red,blue,green pixels */
function redeffect(pixels) {
    for (let i = 0; i < pixels.data.length; i = i + 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.4
// pixels[i+3]=pixels[i+3]*0.4       //we have set global alpha kind of opacity so we didnt alter pixels[i+3] in line(37)
                                              

    }
    return pixels;  //then returning pixels 

}

//same we do with below function but here just we alter the pixels of the present to the 100th or 50th pixel before or after
function rgbsplit(pixels) {
    for (let i = 0; i < pixels.data.length; i = i + 4) {
        pixels.data[i - 250] = pixels.data[i + 0];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i + 550] = pixels.data[i + 2];
        // pixels[i+3]=pixels[i+3]*0.4


    }
    return pixels;
}
video.addEventListener('canplay', paintToCanvas)


function greenscreen(pixels) {
    const levels = {}
    document.querySelectorAll(".rgb input").forEach((input) => {
        levels[input.name] = input.value;
    })
    console.log(levels)
    for (let i = 0; i < pixels.data.length; i = i + 4) {
        let red = pixels.data[i + 0]
        let green = pixels.data[i + 1]
        let blue = pixels.data[i + 2]
        let alpha = pixels.data[i + 3]

        if (red >= levels.rmin && red <= levels.rmax && blue >= levels.bmin && blue <= levels.bmax && green >= levels.gmin && green <= levels.gmax){
           alpha = 0;
        }
    }
    return pixels;
}


