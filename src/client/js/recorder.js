import { createFFmpeg,fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async() =>{
    const ffmpeg = createFFmpeg({log: true});
    await ffmpeg.load();

    ffmpeg.FS("writeFile","recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm","-r","60","convert-output.mp4");
    /* 
        1. ffmpeg.run() 함수를 호출합니다. 이 함수는 비동기 함수이며, FFMPEG 명령을 실행하고 실행 결과를 반환합니다.
        2. 첫 번째 인자로 "-i" 옵션과 함께 "recording.webm" 파일의 경로를 지정합니다. "-i"는 FFMPEG 명령어에서 입력 파일을 지정하는 옵션입니다.
        3. "-r" 옵션과 함께 "60"을 인자로 넘깁니다. "-r" 옵션은 비디오의 프레임 속도를 지정하는 옵션으로, 이 경우 60fps로 지정합니다.
        4. 마지막으로, "convert-output.mp4"를 인자로 넘깁니다. 이는 변환된 비디오 파일의 이름입니다.
    */
   await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1","thumbnail.jpg");
   /**
    1. ffmpeg.run() 함수를 호출합니다. 이 함수는 비동기 함수이며, FFMPEG 명령을 실행하고 실행 결과를 반환합니다.
    2. 첫 번째 인자로 "-i" 옵션과 함께 "recording.webm" 파일의 경로를 지정합니다. "-i"는 FFMPEG 명령어에서 입력 파일을 지정하는 옵션입니다.
    3. "-ss" 옵션과 함께 "00:00:01"을 인자로 넘깁니다. "-ss" 옵션은 비디오에서 시작 지점을 지정하는 옵션으로, 이 경우 1초(00:00:01)로 지정합니다.
    4. "-frames:v" 옵션과 함께 "1"을 인자로 넘깁니다. "-frames:v" 옵션은 비디오에서 추출할 프레임 수를 지정하는 옵션으로, 이 경우 1프레임만 추출합니다.
    5. 명령어 실행 후 결과를 반환합니다. 이 경우, 추출된 비디오 프레임이 새로운 파일에 저장됩니다.
    */
    const mp4File = ffmpeg.FS("readFile", "convert-output.mp4");
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

    const mp4Blob = new Blob([mp4File.buffer],{ type: "video/mp4"}); // binary data을 사용하려면 buffer을 사용해야한다.
    const thumbBlob = new Blob([thumbFile.buffer],{ type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    const a = document.createElement("a");
    a.href=mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbA = document.createElement("a");
    thumbA.href=thumbUrl;
    thumbA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();
}
const handleStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
}
const handleStart = () =>{
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
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
