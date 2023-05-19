let leonTalkStarted = false;
let recognition;

function initializeRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.addEventListener("start", () => {
    console.log("Voice is activated, you can talk to the microphone");
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    console.log("You said: " + transcript);
    // Proceed only if the transcript includes the word "Leon"

    // sendQueryToApi(transcript);
    if (
      transcript.trim().toLowerCase().includes("leon") ||
      transcript.trim().toLowerCase().includes("hey leon")
    ) {
      sendQueryToApi(transcript);
    }
  });

  recognition.onend = () => {
    if (leonTalkStarted) recognition.start();
  };
}

function leonTalk() {
  if (leonTalkStarted) return;

  leonTalkStarted = true;

  if (!recognition) initializeRecognition();

  recognition.start();
}

const audio = new Audio();
audio.addEventListener("ended", () => {
  if (!leonTalkStarted) {
    leonTalkStarted = true;
    if (recognition) {
      recognition.start();
    }
  }
  document.getElementById("output").style.display = "none";
  document.querySelector(".borderBox").style.display = "none";
});

const sendQueryToApi = (transcript) => {
  document.getElementById("circleOuter").style.display = "block";
  document.getElementById("circleOuter1").style.display = "block";

  fetch("https://api.carterapi.com/v0/chat", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "2IKy96qCv45OE2UlwZHMPemOAedYqa9u",
      query: transcript.trim(),
      uuid: "user-id-123",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((data) => {
      audio.src = data.output.voice;
      audio.play();
      document.getElementById("output").style.display = "block";
      document.querySelector(".borderBox").style.display = "block";
      document.getElementById("output").innerHTML = data.output.text;
      document.getElementById("circleOuter").style.display = "none";
      document.getElementById("circleOuter1").style.display = "none";
      // wait 3 seconds and thwn hide
      setTimeout(() => {
        document.getElementById("output").style.display = "none";
        document.querySelector(".borderBox").style.display = "none";
      }, 5000);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("circleOuter").style.display = "none";
      document.getElementById("circleOuter1").style.display = "none";
    });
};

const video1 = document.getElementsByClassName("input_video1")[0];
const out1 = document.getElementsByClassName("output1")[0];
const canvasCtx1 = out1.getContext("2d");

const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};

function onResultsFace(results) {
  document.body.classList.add("loaded");
  canvasCtx1.save();
  canvasCtx1.clearRect(0, 0, out1.width, out1.height);

  if (results.detections.length > 0) {
    drawLandmarks(canvasCtx1, results.detections[0].landmarks, {
      color: "white",
      radius: 1,
    });

    if (!leonTalkStarted) {
      leonTalk();
      fetch("https://api.carterapi.com/v0/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "2IKy96qCv45OE2UlwZHMPemOAedYqa9u",
          query: "Hey LEON, I'm back",
          uuid: "user-id-123",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          audio.src = data.output.voice;
          audio.play();
        });
    }
  } else {
    if (recognition) {
      recognition.stop();
      leonTalkStarted = false; // reset this flag when no face detected
      console.log("Face not detected, recognition stopped.");
      document.getElementById("danger").style.display = "none";
    }
    return;
  }

  canvasCtx1.restore();
}

const faceDetection = new FaceDetection({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
  },
});

faceDetection.onResults(onResultsFace);

const camera = new Camera(video1, {
  onFrame: async () => {
    await faceDetection.send({ image: video1 });
  },
  width: 480,
  height: 480,
});

camera.start();
window.onload = onResultsFace;
