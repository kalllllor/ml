let faceapi;
let detection = [];

let video;
let canvas;

function setup() {
  canvas = createCanvas(480, 360);
  video = createCapture(VIDEO);
  video.size(width, height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5,
  };

  faceapi = ml5.faceApi(
    video,
    faceOptions,
    faceReady
  );
}

function faceReady() {
  faceapi.detect(gotFaces);
}

function gotFaces(err, result) {
  if (err) {
    console.error(err);
    result;
  }

  detection = result;
  faceapi.detect(gotFaces);
}

function draw() {
  clear();
  if (detection.length > 0) {
    for (let i = 0; i < detection.length; i++) {
      console.log(detection[i]);
      const x = detection[i].alignedRect._box._x;
      const y = detection[i].alignedRect._box._y;

      const rectWidth =
        detection[i].alignedRect._box._width;
      const rectHeight =
        detection[i].alignedRect._box._height;

      stroke(255, 0, 0);
      strokeWeight(1);
      noFill();
      rect(x, y, rectWidth, rectHeight);
    }
  }
}
