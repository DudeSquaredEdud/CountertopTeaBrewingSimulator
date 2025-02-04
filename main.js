import * as THREE from 'three';
import * as init from "./initializations.js";
import * as cam from './camera.js';
import * as light from './lights.js';
import * as click from './clicking.js';
import * as interact from './interact.js';

export let loaded = false;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
// Set up the scene, camera, and renderer
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

alert("Note! Buttons were recently swapped: left click now does what right click used to do, and vice versa.");

init.initialization();

// Light!
light.standardLight(scene);

// set the camera to normal mode
cam.neutralPos(true);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
cam.updateCamera(camera);
});