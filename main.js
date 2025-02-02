import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as model from './modelLoading.js';
import * as cam from './camera.js';
import * as light from './lights.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
const raycaster = new THREE.Raycaster();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add the countertop to the scene.
model.quickLoad(scene, "backWall", 'meshes/backWall.glb');
model.quickLoad(scene, "wallsAndFloor", 'meshes/wallsAndFloor.glb');
model.quickLoad(scene, "countertop", 'meshes/countertop.glb');
model.quickLoad(scene, "mug", 'meshes/mug.glb', true);
let mug;
setTimeout(() => { 
mug = scene.getObjectByName("mug");
mug.position.set(0,3.5,-2);
}, 500);



// Light!
light.standardLight(scene);

// set the camera to normal mode
cam.neutralPos(camera);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
cam.updateCamera(camera);
});