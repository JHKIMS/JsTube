import videoModel from "../../models/VideoDb";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play":"Pause";
};

const handleMute = (event) => {
    if(video.muted){
        video.muted=false;
    }else{
        video.muted=true;
    }
    muteBtn.innerText = video.muted ? "UnMute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange=(event) =>{
    const {target:{value}} = event;
    if(video.muted){
        video.muted = false;
        muteBtn.innerText="Mute";
    }
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().slice(11, 19);

const handleLoadMetadata = () =>{
    totalTime.innerText = formatTime(Math.floor(video.duration));
}
const handleTimeUpdate = () =>{
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);

volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("loadedmetadata", handleLoadMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);

