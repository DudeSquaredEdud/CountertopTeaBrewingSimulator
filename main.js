import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
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

quickLoad('meshes/countertop.gltf');

// Light!
const ambientLight = new THREE.AmbientLight(0xafafaa, 5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfaaa50, 1);
directionalLight.position.set(0, 3, -4).normalize();
scene.add(directionalLight);


// Position the camera
camera.translateZ(3);
camera.translateY(5);
camera.rotateX(-.8);

scene.translateY(0);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
});