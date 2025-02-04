import * as THREE from 'three';
import * as init from "./initializations.js";

export let loaded = false;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as model from './modelLoading.js';
import * as cam from './camera.js';
import * as light from './lights.js';
import * as click from './clicking.js';

// Set up the scene, camera, and renderer
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

init.initialization();

// Light!
light.standardLight(scene);

// set the camera to normal mode
cam.neutralPos(true);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
cam.updateCamera(camera);
});