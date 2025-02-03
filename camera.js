import * as THREE from 'three';
import * as main from './main.js';

// Mouse Position vector
var mouse = new THREE.Vector2();

// Position the camera
export function neutralPos(start = false){
    main.camera.position.set(0,6,5);
    if (start) main.camera.rotateX(-.3);
}



export function windowPos(){
    main.camera.position.set(0,6.5,-1);
}

// Move the camera with the mouse a little bit
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (-(event.clientX / window.innerWidth)+.5)/10;
    mouse.y = -.2+(-(event.clientY / window.innerHeight))/15;
}

// Update the camera based on the mouse position
export function updateCamera() {
    // Adjust the camera's position based on the mouse's position
    // For some reason, these are swapped?
    main.camera.rotation.y =  main.camera.rotation.y - (main.camera.rotation.y-mouse.x)*.3;
    main.camera.rotation.x =  main.camera.rotation.x - (main.camera.rotation.x-mouse.y)*.1;  
}
