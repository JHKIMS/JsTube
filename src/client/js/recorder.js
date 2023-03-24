const startBtn = document.getElementById("startBtn");
const videoPreview = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  videoPreview.srcObject = stream;
  videoPreview.play();
};
startBtn.addEventListener("click", handleStart);
