const startBtn = document.getElementById("startBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () =>{
    
}
const handleStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);

    recorder.stop();
}
const handleStart = () =>{
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        const videoFile = URL.createObjectURL(event.data);
        videoPreview.srcObject=null;
        videoPreview.src=videoFile;
        videoPreview.play();
    }
    recorder.start();
}

const init = async () => {
 stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  videoPreview.srcObject = stream;
  videoPreview.play();
};

init();


startBtn.addEventListener("click", handleStart);
