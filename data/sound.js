const record = document.querySelector(".record");
const stop = document.querySelector(".stop");
const soundClips = document.querySelector(".sound-clips");
const timer = document.querySelector('#timer');
let startTime;
let timerInterval
if (navigator.mediaDevices.getUserMedia) {
    console.log("The mediaDevices.getUserMedia() method is supported.");

    const constraints = { audio: true };
    let chunks = [];


    let onSuccess = function (stream) {
        const mediaRecorder = new MediaRecorder(stream);


        record.onclick = function () {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("Recorder started.");
            record.style.background = "red";
            startTime = Date.now();
            console.log(startTime)
            timerInterval = setInterval(updateTimer, 1000);

            stop.disabled = false;
            record.disabled = true;
        };

        stop.onclick = function () {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("Recorder stopped.");
            record.style.background = "";
            record.style.color = "";

            stop.disabled = true;
            record.disabled = false;
            clearInterval(timerInterval);
        };

        mediaRecorder.onstop = function (e) {
            console.log("Last data to read (after MediaRecorder.stop() called).");

            const clipName = prompt(
                "Enter a name for your sound clip?",
                "clip"
            );
            console.log('reset length')
            timer.textContent = `00:00`;
            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const deleteButton = document.createElement("button");

            clipContainer.classList.add("clip");
            audio.setAttribute("controls", "");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";

            if (clipName === null) {
                clipLabel.textContent = "My unnamed clip";
            } else {
                clipLabel.textContent = clipName;
            }

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log("recorder stopped");

            deleteButton.onclick = function (e) {
                e.target.closest(".clip").remove();
            };

            // clipLabel.onclick = function () {
            //     const existingName = clipLabel.textContent;
            //     const newClipName = prompt("Enter a new name for your sound clip?");
            //     if (newClipName === null) {
            //         clipLabel.textContent = existingName;
            //     } else {
            //         clipLabel.textContent = newClipName;
            //     }
            // };
        };

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        };
    };

    let onError = function (err) {
        console.log("The following error occured: " + err);
    };

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
} else {
    console.log("MediaDevices.getUserMedia() not supported on your browser!");
}

function updateTimer() {
    const elapsedTime = new Date(Date.now() - startTime);
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
}