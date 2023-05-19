// const video1 = document.getElementsByClassName("input_video1")[0];
// const out1 = document.getElementsByClassName("output1")[0];
// const canvasCtx1 = out1.getContext("2d");

// const spinner = document.querySelector(".loading");
// spinner.ontransitionend = () => {
//   spinner.style.display = "none";
// };

// function onResultsFace(results) {
//   document.body.classList.add("loaded");
//   canvasCtx1.save();
//   canvasCtx1.clearRect(0, 0, out1.width, out1.height);

//   if (results.detections.length > 0) {
//     // Removed the drawLandmarks function call
//     leonTalk();
//   }

//   canvasCtx1.restore();
// }

// const faceDetection = new FaceDetection({
//   locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
//   },
// });

// faceDetection.onResults(onResultsFace);

// const camera = new Camera(video1, {
//   onFrame: async () => {
//     await faceDetection.send({ image: video1 });
//   },
//   width: 480,
//   height: 480,
// });

// camera.start();
// window.onload = onResultsFace;
