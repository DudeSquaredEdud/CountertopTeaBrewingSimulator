import * as THREE from 'three';
import * as init from "./initializations.js";
import * as cam from './camera.js';
import * as light from './lights.js';
import * as click from './clicking.js'; // DON'T REMOVE
import * as interact from './interact.js';
import * as loading from './loadingScreen.js';
import * as move from "./move.js";

export let loaded = false;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
// Set up the scene, camera, and renderer
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

loading.loading_quote();
// Light!
light.standardLight(scene);
// light.ambientOnly(scene);


const up = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox/sk_top.png"), side: THREE.BackSide });
const sd = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox/sk_side.png"), side: THREE.BackSide });
const dn = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("skybox/sk_bottom.png"), side: THREE.BackSide });
let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
let skybox = new THREE.Mesh(skyboxGeo, [sd,sd,up,dn,sd,sd]);
scene.add(skybox)

// set the camera to normal mode
cam.neutralPos(true);


await init.initialization_Countertop();

camera.setFocalLength(18);
document.getElementById("LoadingScreen").style.display = "none";


renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    move.move();
    cam.updateCamera();
});