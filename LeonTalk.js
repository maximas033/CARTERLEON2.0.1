// Constants
const SPEECH_API_KEY = "dc90d41a-a088-428c-bbfd-35419723deee";
const database = firebase.database();
const dbRef = database.ref("LEONON");

// Speech Recognition Setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// UI Elements
const activateButton = document.getElementById("name");
// Voice Recognition Functions
recognition.onstart = () => console.log("Voice recognition started");

const startRecognition = () => {
  recognition.start();
  recognition.onend = recognition.start;
};

const stopRecognition = () => {
  recognition.stop();
  recognition.onend = null;
};

recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  console.log(transcript);

  // Check for the wake word
  const wakeWord = "leon";
  if (!transcript.toLowerCase().startsWith(wakeWord)) {
    return; // If the transcript doesn't start with "hey leon", do nothing.
  }

  // Trim the wake word from the start of the transcript.
  const command = transcript.substring(wakeWord.length).trim();

  document.getElementById("circleOuter").style.display = "block";
  document.getElementById("circleOuter1").style.display = "block";
  try {
    const response = await fetch("https://api.carterlabs.ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: transcript,
        key: "dc90d41a-a088-428c-bbfd-35419723deee",
        playerId: "ply1234",
      }),
    });
    const data = await response.json();
    console.log(data);

    const speakResponse = await fetch("https://api.carterlabs.ai/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: data.output.text,
        key: "dc90d41a-a088-428c-bbfd-35419723deee",
        voice_id: "male",
      }),
    });
    stopRecognition();
    const speakData = await speakResponse.json();
    console.log(speakData.file_url);
    const audio = new Audio(speakData.file_url);
    audio.play();

    document.getElementById("circleOuter").style.display = "block";
    document.getElementById("circleOuter1").style.display = "block";
    document.querySelector(".borderBox").style.display = "block";
    document.getElementById("output").style.display = "block";
    document.getElementById("output").innerHTML = data.output.text;
    audio.addEventListener("ended", () => {
      startRecognition();
      document.getElementById("circleOuter").style.display = "none";
      document.getElementById("circleOuter1").style.display = "none";
      document.querySelector(".borderBox").style.display = "none";
      document.getElementById("output").style.display = "none";
      document.getElementById("output").innerHTML = "";
    });

    if (data.forced_behaviours && Array.isArray(data.forced_behaviours)) {
      if (data.forced_behaviours[0].name === "I am Home") {
        runHandpose();
      } else {
        console.log("nothing here");
      }
    } else {
      console.log("nothing happening");
    }
  } catch (error) {
    console.error(error);
  }
};

// UI Actions
const toggleVoiceActivation = () => {
  dbRef.once("value").then((snapshot) => {
    const currentValue = snapshot.val();
    if (currentValue === "ON") {
      dimTheScreen();
      showDashboard();
      hideTheDay();
      stopRecognition();
      dbRef.set("OFF");
    } else {
      brightTheScreen();
      hideDashboard();
      showTheDay();
      startRecognition();
      dbRef.set("ON");
    }
  });
};

activateButton.addEventListener("click", toggleVoiceActivation);

let lastValue = null;

function GetValue() {
  // check if you are connected to wifi
  if (navigator.onLine) {
    // if you are connected to wifi
    const dbRef = database.ref("LEONON");

    dbRef.on("value", (snapshot) => {
      const currentValue = snapshot.val();

      if (currentValue !== lastValue) {
        console.log(currentValue);
        lastValue = currentValue;

        if (currentValue === "ON") {
          showTheDay();
          brightTheScreen();
          hideDashboard();
          startRecognition();
          checkShowNewsValue();
        } else {
          hideTheNews();
          hideTheDay();
          dimTheScreen();
          showDashboard();
          stopRecognition();
        }
      }
    });
  } else {
    document.getElementById("circle1").style.border = "1px solid red";
    document.getElementById("topAll").style.display = "none";
  }
}

window.onload = GetValue();
