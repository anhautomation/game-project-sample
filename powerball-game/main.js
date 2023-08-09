import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import io from "socket.io-client";
import axios from "axios";

let renderer, camera, controls, scene, ambientLight, dirLight, world;
let cageMesh,
  ballMesh,
  ballTexture = [],
  ballMeshList = [],
  ballBody,
  ballBodyList = [],
  ballBodyFixed,
  constraints,
  constraintsList = [],
  numberMat,
  numberMesh,
  numberMeshList = [],
  result = [],
  stopPosition = [],
  start = false,
  ballCheckList = [],
  index = 0,
  resetCheck = true;
const cageSize = 10,
  ballSize = 1.2,
  numBall = 28,
  numPower = 10,
  textSize = 0.75,
  worldStep = 1 / 60,
  loader = new FontLoader(),
  fixedPoint = new CANNON.Vec3(0, 0, 0),
  textureLoader = new THREE.TextureLoader(),
  ballMaterial = new CANNON.Material({ restitution: 0.75 }),
  socket = io("http://103.31.12.151:5997/"),
  LATEST_RESULT_API =
    "http://103.31.12.151:5997/powerball-game/get-latest-balls";

async function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#38405A");
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1500
  );
  camera.position.set(0, -5, 28);

  // Light
  ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  dirLight = new THREE.DirectionalLight(0xfdfd96, 1);
  dirLight.position.set(-10, 10, 10);
  dirLight.lookAt(0, 0, 0);
  scene.add(dirLight);

  // World
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 35;
  controls.minDistance = 15;
  controls.enablePan = false;

  // Stop position
  stopPosition[0] = new THREE.Vector3(-15, -8, 15);
  stopPosition[1] = new THREE.Vector3(-9, -8, 15);
  stopPosition[2] = new THREE.Vector3(-3, -8, 15);
  stopPosition[3] = new THREE.Vector3(3, -8, 15);
  stopPosition[4] = new THREE.Vector3(9, -8, 15);
  stopPosition[5] = new THREE.Vector3(15, -8, 15);

  // Ball texture
  ballTexture.push(textureLoader.load("Ball/Ball-Base.jpg"));
  ballTexture.push(textureLoader.load("Ball/Ball-Height.png"));
  ballTexture.push(textureLoader.load("Ball/Ball-Nor.jpg"));
  ballTexture.push(textureLoader.load("Ball/Ball-Roughness.jpg"));

  // Get old results
  const apiResult = await axios.get(LATEST_RESULT_API);

  result = JSON.parse(apiResult.data.coins);
}

function createCage() {
  cageMesh = new THREE.Mesh(
    new THREE.SphereGeometry(cageSize, 16, 16),
    new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
    })
  );
  cageMesh.position.set(0, 0, 0);

  scene.add(cageMesh);
}

function createBall() {
  ballBodyFixed = new CANNON.Body({ mass: 0 });
  ballBodyFixed.addShape(new CANNON.Sphere(ballSize));
  ballBodyFixed.position.set(0, 0, 0);
  world.addBody(ballBodyFixed);

  for (let i = 0; i < numBall + numPower; i++) {
    ballCheckList[i] = true;

    ballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(ballSize),
      new THREE.MeshStandardMaterial({
        color: i < numBall ? Math.random() * 0xffffff : 0xffffff,
        map: ballTexture[0],
        normalMap: ballTexture[2],
        displacementMap: ballTexture[1],
        displacementScale: 0.1,
        roughnessMap: ballTexture[3],
        roughness: 0.5,
      })
    );

    scene.add(ballMesh);
    ballMeshList.push(ballMesh);

    loader.load("Inter_Bold.json", (font) => {
      numberMat = new THREE.MeshStandardMaterial({
        color: i < numBall ? "white" : "black",
      });
      numberMesh = new THREE.Mesh(
        new TextGeometry(((i % numBall) + 1).toString(), {
          font: font,
          height: 0.2,
          size: textSize,
          curveSegments: 12,
          bevelEnabled: false,
        }),
        numberMat
      );

      if (i % numBall < 9) {
        numberMesh.geometry.translate(
          -textSize / 2,
          -textSize / 2,
          -textSize / 2
        );
      } else {
        numberMesh.geometry.translate(-textSize, -textSize / 2, -textSize / 2);
      }
      scene.add(numberMesh);
      numberMeshList.push(numberMesh);
    });

    ballBody = new CANNON.Body({ mass: 1, material: ballMaterial });
    ballBody.addShape(new CANNON.Sphere(ballSize));

    let x = Math.floor(Math.random() * cageSize) - cageSize / 2,
      y = Math.floor(Math.random() * cageSize) - cageSize / 2,
      z = Math.floor(Math.random() * cageSize) - cageSize / 2;
    ballBody.position.set(x, y, z);
    world.addBody(ballBody);
    ballBodyList.push(ballBody);

    constraints = new CANNON.PointToPointConstraint(
      ballBodyFixed,
      fixedPoint,
      ballBody,
      new CANNON.Vec3(0, -8.5, 0)
    );
    world.addConstraint(constraints);
    constraintsList.push(constraints);
  }
}

function updateWorld() {
  const cameraPosition = getCurrentCameraPosition();

  for (let i = 0; i < ballBodyList.length; i++) {
    if (ballCheckList[i]) {
      ballMeshList[i].position.copy(ballBodyList[i].position);
      ballMeshList[i].quaternion.copy(ballBodyList[i].quaternion);
    }

    if (numberMeshList[i]) {
      numberMeshList[i].position.copy(ballMeshList[i].position);
      numberMeshList[i].position.lerp(cameraPosition, 0.15);
      numberMeshList[i].lookAt(cameraPosition);
    }
  }

  if (start === true) {
    let i = result[index] - 1;

    if (index === result.length - 1) i += 28;

    if (ballCheckList[i]) {
      world.removeBody(ballBodyList[i]);
      world.removeConstraint(constraintsList[i]);
      ballCheckList[i] = false;
    }

    if (stopPosition[index].distanceTo(ballMeshList[i].position) >= 0.1) {
      ballMeshList[i].position.lerp(stopPosition[index], 0.05);
    } else {
      index++;

      if (index >= result.length) start = false;
    }
  }
}

function bounce() {
  world.addEventListener("postStep", () => {
    for (let i = 0; i < ballBodyList.length; i++) {
      let bounceForce;

      if (ballBodyList[i].position.y < -8) {
        bounceForce = new CANNON.Vec3(15, 15, 0);
        ballBodyList[i].applyForce(bounceForce, ballBodyList[i].position);
      }

      if (ballBodyList[i].position.x > 7) {
        bounceForce = new CANNON.Vec3(-45, 0, 0);
        ballBodyList[i].applyForce(bounceForce, ballBodyList[i].position);
      }
    }
  });
}

// Get position of camera
function getCurrentCameraPosition() {
  const target = controls.target;
  const spherical = new THREE.Spherical().setFromVector3(
    camera.position.clone().sub(target)
  );

  const position = new THREE.Vector3();
  position.setFromSpherical(spherical);
  position.add(target);

  return position;
}

// Check window resize
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

function resetCamera() {
  controls.enabled = true;
}

function lockCamera() {
  camera.position.set(0, -5, 28);
  controls.enabled = false;
}

function reset() {
  resetCheck = false;
  start = false;

  for (let i = 0; i < ballMeshList.length; i++) {
    scene.remove(ballMeshList[i]);
    world.removeBody(ballBodyList[i]);
    world.removeConstraint(constraintsList[i]);
    scene.remove(numberMeshList[i]);
  }

  index = 0;
  ballMeshList = [];
  ballBodyList = [];
  numberMeshList = [];
  constraintsList = [];

  createBall();
}

function animate() {
  world.step(worldStep);

  // Số vòng mỗi phút bằng 1800 / số vòng mong muốn

  cageMesh.rotation.z += Math.PI / 90;

  controls.update();

  updateWorld();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

function getResult() {
  const getAPI = setTimeout(async () => {
    const apiResult = await axios.get(
      "http://103.31.12.151:5997/powerball-game/get-latest-balls"
    );
    socket.off("powerball-game-latest-balls");
    start = true;
    resetCheck = true;
    result = JSON.parse(apiResult.data.coins);

    return;
  }, 10000);

  socket.on("powerball-game-latest-balls", (data) => {
    const dataObject = JSON.parse(data);
    const balls = JSON.parse(dataObject.balls);

    for (let i = 0; i < balls.length; i++) {
      if (balls[i] !== result[i]) {
        start = true;
        resetCheck = true;
        socket.off("powerball-game-latest-balls");
        clearTimeout(getAPI);
        result = balls;
        return;
      }
    }
  });
}

init();
createCage();
createBall();
bounce();

socket.on("powerball-game-timer", (data) => {
  const dataObject = JSON.parse(data);
  const countDown = dataObject.countdown;

  if (countDown === 60) {
    lockCamera();
    getResult();
    setTimeout(() => {
      resetCamera();
    }, 10000);
  }
  if (countDown <= 20 && resetCheck) {
    reset();
  }
});

requestAnimationFrame(animate);
