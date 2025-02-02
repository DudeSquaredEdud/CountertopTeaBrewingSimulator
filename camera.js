import * as THREE from 'three';

// Mouse Position vector
var mouse = new THREE.Vector2();

// Position the camera
export function neutralPos(camera){
    camera.translateZ(5);
    camera.translateY(6);
    camera.translateX(0);
    camera.rotateX(-.3);
}

// Move the camera with the mouse a little bit
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (-(event.clientX / window.innerWidth)+.5)/10;
    mouse.y = -.2+(-(event.clientY / window.innerHeight))/15;
}

// Update the camera based on the mouse position
export function updateCamera(camera) {
    // Adjust the camera's position based on the mouse's position
    // For some reason, these are swapped?
    camera.rotation.y =  mouse.x;
    camera.rotation.x =  mouse.y;  
}