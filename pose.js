let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  console.log(poseNet);
}

function modelLoaded() {
  console.log("model was loaded");
}

function gotPoses(poses) {
  pose = poses.length
    ? poses[0].pose.keypoints
    : null;

  skeleton = poses.length
    ? poses[0].skeleton
    : null;
}

function draw() {
  image(video, 0, 0);
  if (pose) {
    for (let i = 0; i < pose.length; i++) {
      const position = pose[i].position;
      circle(position.x, position.y, 10);
    }
  }
  if (skeleton) {
    for (let i = 0; i < skeleton.length; i++) {
      const position1 = skeleton[i][0].position;
      const position2 = skeleton[i][1].position;
      line(
        position1.x,
        position1.y,
        position2.x,
        position2.y
      );
    }
  }
}
