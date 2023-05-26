// const video = document.getElementById("video");
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// // Hide the video element
// video.style.display = "none";

// // Rest of the code remains the same...
// const loadCamera = async () => {
//   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//   video.srcObject = stream;

//   return new Promise((resolve) => {
//     video.onloadedmetadata = () => {
//       resolve(video);
//     };
//   });
// };

// const loadHandposeModel = async () => {
//   return await handpose.load();
// };

// const drawKeypoints = (predictions) => {
//   const scalingFactor = 0.5;

//   for (let i = 0; i < predictions.length; i++) {
//     const keypoints = predictions[i].landmarks;

//     ctx.save(); // Save the current transformation state

//     // Apply scaling
//     ctx.scale(scalingFactor, scalingFactor);

//     // Draw circles at each keypoint location
//     for (let j = 0; j < keypoints.length; j++) {
//       const [x, y, z] = keypoints[j];

//       // Increase the circle radius and line width for better visibility
//       const radius = 4;
//       const lineWidth = 2;

//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, 2 * Math.PI);
//       ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Set a semi-transparent white fill color
//       ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Set a semi-transparent black stroke color
//       ctx.lineWidth = lineWidth;
//       ctx.fill();
//       ctx.stroke();
//     }

//     // Draw lines between adjacent keypoints with thicker stroke
//     const connections = [
//       [0, 1],
//       [1, 2],
//       [2, 3],
//       [3, 4], // Thumb
//       [0, 5],
//       [5, 6],
//       [6, 7],
//       [7, 8], // Index finger
//       [0, 9],
//       [9, 10],
//       [10, 11],
//       [11, 12], // Middle finger
//       [0, 13],
//       [13, 14],
//       [14, 15],
//       [15, 16], // Ring finger
//       [0, 17],
//       [17, 18],
//       [18, 19],
//       [19, 20], // Pinky
//       [0, 18], // Connection between thumb and pinky
//     ];

//     // Increase the line width for better visibility
//     const lineWidth = 3;

//     ctx.lineWidth = lineWidth;

//     for (let j = 0; j < connections.length; j++) {
//       const [start, end] = connections[j];
//       const [x1, y1, z1] = keypoints[start];
//       const [x2, y2, z2] = keypoints[end];

//       ctx.beginPath();
//       ctx.moveTo(x1, y1);
//       ctx.lineTo(x2, y2);
//       ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"; // Set a semi-transparent black stroke color
//       ctx.stroke();
//     }

//     ctx.restore(); // Restore the transformation state
//   }
// };

// const runHandpose = async () => {
//   const model = await loadHandposeModel();
//   const videoElement = await loadCamera();

//   videoElement.play();

//   setInterval(async () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Predict hand landmarks in video
//     const predictions = await model.estimateHands(videoElement);

//     if (predictions.length > 0) {
//       drawKeypoints(predictions);
//     }
//   }, 100);
// };

// runHandpose();
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Hide the video element
video.style.display = "none";

// Rest of the code remains the same...
const loadCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
};

const loadHandposeModel = async () => {
  return await handpose.load();
};

const drawKeypoints = (predictions) => {
  const scalingFactor = 0.5;

  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].landmarks;

    ctx.save(); // Save the current transformation state

    // Apply scaling
    ctx.scale(scalingFactor, scalingFactor);

    // Draw circles at each keypoint location
    for (let j = 0; j < keypoints.length; j++) {
      const [x, y, z] = keypoints[j];

      // Increase the circle radius and line width for better visibility
      const radius = 4;
      const lineWidth = 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Set a semi-transparent white fill color
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)"; // Set a semi-transparent black stroke color
      ctx.lineWidth = lineWidth;
      ctx.fill();
      ctx.stroke();
    }

    // Draw lines between adjacent keypoints with thicker stroke
    const connections = [
      // Existing connections
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4], // Thumb
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8], // Index finger
      [0, 9],
      [9, 10],
      [10, 11],
      [11, 12], // Middle finger
      [0, 13],
      [13, 14],
      [14, 15],
      [15, 16], // Ring finger
      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20], // Pinky
      [0, 18], // Connection between thumb and pinky

      // Additional connections
      [5, 9], // Connection between index finger and middle finger
      [9, 13], // Connection between middle finger and ring finger
      [13, 17], // Connection between ring finger and pinky
    ];

    // Increase the line width for better visibility
    const lineWidth = 3;

    ctx.lineWidth = lineWidth;

    for (let j = 0; j < connections.length; j++) {
      const [start, end] = connections[j];
      const [x1, y1, z1] = keypoints[start];
      const [x2, y2, z2] = keypoints[end];

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"; // Set a semi-transparent black stroke color
      ctx.stroke();
    }

    ctx.restore(); // Restore the transformation state
  }
};

const runHandpose = async () => {
  const model = await loadHandposeModel();
  const videoElement = await loadCamera();

  videoElement.play();

  setInterval(async () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Predict hand landmarks in video
    const predictions = await model.estimateHands(videoElement);

    if (predictions.length > 0) {
      const extendedFingersCount = detectExtendedFingers(
        predictions[0].landmarks
      );

      drawKeypoints(predictions);
      drawFingerCount(extendedFingersCount);
    }
  }, 100);

  function detectExtendedFingers(landmarks) {
    // Assuming the landmarks array is in the format: [wrist, thumb, index, middle, ring, pinky]
    const fingerTips = [4, 8, 12, 16, 20]; // Indices of the finger tips

    let extendedFingersCount = 0;

    for (let i = 0; i < fingerTips.length; i++) {
      const fingerTip = landmarks[fingerTips[i]];
      const fingerBase = landmarks[fingerTips[i] - 3]; // Index of the finger base is 3 less than the finger tip

      // Check if the finger tip is higher (along the y-axis) than the finger base
      const isFingerExtended = fingerTip[1] < fingerBase[1];

      if (isFingerExtended) {
        extendedFingersCount++;
      }
    }

    return extendedFingersCount;
  }

  function drawFingerCount(fingerCount) {
    ctx.save();
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.textAlign = "center";
    ctx.fillText(`Extended Fingers: ${fingerCount}`, canvas.width / 2, 30);
    ctx.restore();

    if (fingerCount === 5) {
      console.log(5); // Log 5 when there are five extended fingers
    }
  }
};

runHandpose();
