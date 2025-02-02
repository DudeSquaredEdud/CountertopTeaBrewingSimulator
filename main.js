import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
const renderer = new THREE.WebGLRenderer();
var mouse = new THREE.Vector2();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLB loader
const loader = new GLTFLoader();

function quickLoad(path) {
    loader.load( path, function ( gltf ) {

        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    });
};

quickLoad('meshes/countertop.glb');

// Light!
const ambientLight = new THREE.AmbientLight(0xafafaa, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfaaa50, 1);
directionalLight.position.set(0, 3, -4).normalize();
scene.add(directionalLight);


// Position the camera
camera.translateZ(5);
camera.translateY(6);
camera.translateX(0);
camera.rotateX(-.3);

scene.translateY(0);

// Move the camera with the mouse a little bit
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (-(event.clientX / window.innerWidth)+.5)/5;
    mouse.y = -.2+(-(event.clientY / window.innerHeight))/10;
}

// Update the camera based on the mouse position
function updateCamera() {
    // Adjust the camera's position based on the mouse's position
    camera.rotation.y =  mouse.x;
    camera.rotation.x =  mouse.y;
    
}

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
updateCamera();
});