import { createFFmpeg,fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const videoPreview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input:"recording.webm",
    output: "convert-output.mp4",
    thumb: "thumbnail.jpg",
}
const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href=fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}

const handleDownload = async() =>{
    actionBtn.removeEventListener("click", handleDownload);

    actionBtn.innerText = "Transcoding~";
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({log: true});
    await ffmpeg.load();

    ffmpeg.FS("writeFile",files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i", files.input,"-r","60",files.output);
    /* 
        1. ffmpeg.run() 함수를 호출합니다. 이 함수는 비동기 함수이며, FFMPEG 명령을 실행하고 실행 결과를 반환합니다.
        2. 첫 번째 인자로 "-i" 옵션과 함께 "recording.webm" 파일의 경로를 지정합니다. "-i"는 FFMPEG 명령어에서 입력 파일을 지정하는 옵션입니다.
        3. "-r" 옵션과 함께 "60"을 인자로 넘깁니다. "-r" 옵션은 비디오의 프레임 속도를 지정하는 옵션으로, 이 경우 60fps로 지정합니다.
        4. 마지막으로, "convert-output.mp4"를 인자로 넘깁니다. 이는 변환된 비디오 파일의 이름입니다.
    */
   await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1",files.thumb);
   /**
    1. ffmpeg.run() 함수를 호출합니다. 이 함수는 비동기 함수이며, FFMPEG 명령을 실행하고 실행 결과를 반환합니다.
    2. 첫 번째 인자로 "-i" 옵션과 함께 "recording.webm" 파일의 경로를 지정합니다. "-i"는 FFMPEG 명령어에서 입력 파일을 지정하는 옵션입니다.
    3. "-ss" 옵션과 함께 "00:00:01"을 인자로 넘깁니다. "-ss" 옵션은 비디오에서 시작 지점을 지정하는 옵션으로, 이 경우 1초(00:00:01)로 지정합니다.
    4. "-frames:v" 옵션과 함께 "1"을 인자로 넘깁니다. "-frames:v" 옵션은 비디오에서 추출할 프레임 수를 지정하는 옵션으로, 이 경우 1프레임만 추출합니다.
    5. 명령어 실행 후 결과를 반환합니다. 이 경우, 추출된 비디오 프레임이 새로운 파일에 저장됩니다.
    */
    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);

    const mp4Blob = new Blob([mp4File.buffer],{ type: "video/mp4"}); // binary data을 사용하려면 buffer을 사용해야한다.
    const thumbBlob = new Blob([thumbFile.buffer],{ type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");

    // FFmpeg로 변환작업을 수행할 때 임시 파일을 삭제하기 위함(속도+저장공간 확보)
    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    init();
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);
}
const handleStop = () =>{
    actionBtn.innerText = "Download Recording";
    actionBtn.removeEventListener("click", handleStop);
    actionBtn.addEventListener("click", handleDownload);

    recorder.stop();
}
const handleStart = () =>{
    actionBtn.innerText = "Stop Recording";
    actionBtn.removeEventListener("click", handleStart);
    actionBtn.addEventListener("click", handleStop);

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


actionBtn.addEventListener("click", handleStart);
