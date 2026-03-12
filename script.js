const meme = document.getElementById("meme")
const scanButton = document.getElementById("scanButton")
const resetButton = document.getElementById("resetButton")
const result = document.getElementById("result")
const progress = document.getElementById("progress")
const beep = document.getElementById("beepSound")
const scanLine = document.querySelector(".scan-line")
const whatsappButton = document.getElementById("shareBtn")

/* Start Webcam */

Webcam.set({
width:600,
height:400,
image_format:'jpeg',
jpeg_quality:90
})

Webcam.attach("#video")

/* Buttons */

scanButton.addEventListener("click", checkFaceVisibility)
resetButton.addEventListener("click", resetScan)

/* WhatsApp Share */

whatsappButton.addEventListener("click", async () => {

const img = document.getElementById("meme")

if (!img.src) {
alert("Generate a meme first!")
return
}

try {

const response = await fetch(img.src)
const blob = await response.blob()

const file = new File([blob], "meme.png", { type: blob.type })

await navigator.share({
title: "Brain Cell Analyzer Meme",
text: "Check out this meme I generated 😂",
files: [file]
})

} catch (error) {
alert("Sharing not supported on this browser")
}

})

/* Face visibility check */

function checkFaceVisibility(){

Webcam.snap(function(data_uri){

const img = new Image()
img.src = data_uri

img.onload = function(){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = img.width
canvas.height = img.height

ctx.drawImage(img,0,0)

const pixels = ctx.getImageData(0,0,canvas.width,canvas.height).data

let brightness = 0

for(let i=0;i<pixels.length;i+=4){
brightness += pixels[i] + pixels[i+1] + pixels[i+2]
}

brightness = brightness/(pixels.length/4)/3

if(brightness < 60){

result.style.display="block"
result.innerHTML="⚠ Face not visible. Please look at the camera."
return

}

startActualScan()

}

})

}

/* Start scanning */

function startActualScan(){

result.style.display="block"
result.innerHTML=""
meme.style.display="none"

progress.style.width="0%"

/* scanner line */

scanLine.style.opacity="1"
scanLine.style.animation="scan 2s linear infinite"

/* beep sound */

beep.loop = true
beep.currentTime = 0
beep.play()

setTimeout(()=>{
beep.pause()
beep.currentTime = 0
},5000)

/* AI scan messages */

const steps=[

"Initializing Neural Scanner...",
"Connecting to Brain Database...",
"Analyzing Cognitive Capacity...",
"Detecting Common Sense...",
"Running AI Intelligence Model...",
"Finalizing Results..."

]

steps.forEach((step,index)=>{

setTimeout(()=>{

result.innerHTML += `<p>${step}</p>`

progress.style.width = `${((index+1)/steps.length)*100}%`

},(index+1)*1000)

})

setTimeout(showResult,7000)

}

/* Show result */

function showResult(){

scanLine.style.opacity="0"
progress.style.width="100%"

const brainCells = Math.floor(Math.random()*10)

result.innerHTML += `<p><b>Brain Cells Remaining: ${brainCells}</b></p>`

let roast=""

if(brainCells<=2){
roast="⚠️ System barely operational"
}
else if(brainCells<=5){
roast="🤔 Some thinking detected"
}
else if(brainCells<=8){
roast="🧐 Suspicious intelligence detected"
}
else{
roast="🤯 Are you secretly a genius?"
}

result.innerHTML += `<p>${roast}</p>`

showMeme()

}

/* Random emotion generator */

function detectEmotion(){

const emotions = ["happy","sad","angry","surprised","neutral"]

const randomIndex = Math.floor(Math.random()*emotions.length)

return emotions[randomIndex]

}

/* Show meme */

function showMeme(){

const emotion = detectEmotion()

const emotionMemes = {

happy:"https://i.imgflip.com/30b1gx.jpg",
sad:"https://i.imgflip.com/1bij.jpg",
angry:"https://i.imgflip.com/26am.jpg",
surprised:"https://i.imgflip.com/1ur9b0.jpg",
neutral:"https://i.imgflip.com/3si4.jpg"

}

meme.src = emotionMemes[emotion]

meme.style.display="block"

result.innerHTML += `<p>Detected Emotion: ${emotion}</p>`

const captions=[

"When the brain cell finally wakes up",
"Thinking is optional today",
"System reboot required",
"Me pretending to understand the lecture",
"That one brain cell working overtime"

]

const caption = captions[Math.floor(Math.random()*captions.length)]

result.innerHTML += `<p>${caption}</p>`

}

/* Reset */

function resetScan(){

result.innerHTML=""
result.style.display="none"

meme.style.display="none"

progress.style.width="0%"

scanLine.style.opacity="0"
scanLine.style.animation="none"

beep.pause()
beep.currentTime = 0

}






