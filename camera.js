import * as THREE from 'three';
import * as main from './main.js';
import * as click from "./clicking.js";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

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


// RECONSIDER THESE!!!!!
export function windowPos(object = main.camera, offset = [0,0,0]){
    object.position.set(
        0+  offset[0],
        6.5+offset[1],
        -1+ offset[2]
    );
}

export function CVPos(object = main.camera, offset = [0,0,0]){
    object.position.set(
        0+  offset[0],
        -35+offset[1],
        10+ offset[2]
    );
}

export let controls;


setTimeout(() => {
    // add a way to escape pointerlock
    controls = new PointerLockControls( main.camera, document.body );
    document.addEventListener( 'click', function () {controls.lock();} );
}, 500)

const half_window_width = window.innerWidth/2;
const half_window_height = window.innerHeight/2;
document.getElementById("tooltip").style.left = (half_window_width+5)+"px";
document.getElementById("tooltip").style.top = (half_window_height+10)+"px";

// Move the camera with the mouse a little bit
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (-(event.clientX / window.innerWidth)*2+1);
    mouse.y = (-(event.clientY / window.innerHeight)*2);
    const intersects = click.raycastIntersectFromWaist(event);
    if (intersects.length > 0) {
        // Either that object or the one behind it
        const focusedObject = intersects[0].object;
        if(intersects[0].distance < 50 && focusedObject.tooltip){
            document.getElementById("tooltip").textContent = focusedObject.tooltip;
            document.getElementById("tooltip").style.display = "unset";
        }
        else document.getElementById("tooltip").style.display = "none";
    }
    else document.getElementById("tooltip").style.display = "none";
}

// Update the camera based on the mouse position
export function updateCamera() {
}
