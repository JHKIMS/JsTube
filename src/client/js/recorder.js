const startBtn = document.getElementById("startBtn");
const videoPreview = document.getElementById("preview");

let stream;

const handleStop = () =>{
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
}
const handleStart = () =>{
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => console.log(e);
    recorder.start();
    setTimeout(() =>{
        recorder.stop();
    }, 10000);
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
