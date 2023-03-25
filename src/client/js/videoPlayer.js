const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;

let controlsTimeout = null;
let controlsMovementTimeout = null;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().slice(11, 19);

const handleLoadMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
  escChangeScreenBtn();
};
// ESC 키를 눌렀을 때 Enter Full Screen으로 변경
const escChangeScreenBtn = document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.exitFullscreen();
      fullScreenBtn.innerText = "Enter Full Screen";
    }
  });

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout=null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls,2000)
}
const handleMouseLeave =() =>{
    controlsTimeout = setTimeout(hideControls,2000)
}
const handleEnded = () =>{
  const id = videoContainer.dataset.id;
  fetch(`/api/videos/${id}/view`,{
    method: "POST",
  });
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);

volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("loadedmetadata", handleLoadMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);

timeline.addEventListener("input", handleTimeLineChange);

fullScreenBtn.addEventListener("click", handleFullScreen);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

video.addEventListener("ended", handleEnded);
