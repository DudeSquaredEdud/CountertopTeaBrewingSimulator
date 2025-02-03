import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as model from './modelLoading.js';
import * as cam from './camera.js';
import * as light from './lights.js';
import * as click from './clicking.js';

// Set up the scene, camera, and renderer
export let loaded = false;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add the countertop to the scene.
model.quickLoad(scene, "outside_model", 'meshes/outside.glb');
model.quickLoad(scene, "backWall_model", 'meshes/backWall.glb');
model.quickLoad(scene, "wallsAndFloor_model", 'meshes/wallsAndFloor.glb');
model.quickLoad(scene, "countertop_model", 'meshes/countertop.glb');
model.quickLoad(scene, "mug_model", 'meshes/mug.glb', true);
export let mug;
let sky;
setTimeout(() => { 
mug = scene.getObjectByName("mug_model");
mug.position.set(0,3.5,-2);
mug.rotation.set(0,90,0);
mug.hand = false;
scene.getObjectByName("Water").material.visible = false;

sky = scene.getObjectByName("Sky");
sky.look = false;
loaded = true;
}, 500);


// Light!
light.standardLight(scene);

// set the camera to normal mode
cam.neutralPos(true);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
cam.updateCamera(camera);
});