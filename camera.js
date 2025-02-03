import * as THREE from 'three';
import * as main from './main.js';

// Mouse Position vector
var mouse = new THREE.Vector2();

// Position the camera
export function neutralPos(start = false, object = main.camera, offset = [0,0,0]){
    object.position.set(
        0+offset[0],
        6+offset[1],
        5+offset[2]
    );
    if (start) object.rotateX(-.3);
}

export function windowPos(object = main.camera, offset = [0,0,0]){
    object.position.set(
        0+  offset[0],
        6.5+offset[1],
        -1+ offset[2]
    );
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
    if (main.loaded){
        if (main.mug.hand){
            // main.mug.position.y =  mouse.x;
            main.mug.position.x = -mouse.x*1.3; 
            main.mug.rotation.y = mouse.x*0.8+90;
    
        }
    }
}
