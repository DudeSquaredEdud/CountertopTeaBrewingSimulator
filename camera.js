import * as THREE from 'three';
import * as main from './main.js';
import * as click from "./clicking.js"

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

export function CVPos(object = main.camera, offset = [0,0,0]){
    object.position.set(
        0+  offset[0],
        -35+offset[1],
        10+ offset[2]
    );
}

// Move the camera with the mouse a little bit
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (-(event.clientX / window.innerWidth)+.5)/3;
    mouse.y = (-(event.clientY / window.innerHeight)+.5)/3;
    document.getElementById("tooltip").style.left = (event.clientX + 10)+"px";
    document.getElementById("tooltip").style.top = (event.clientY + 5)+"px";
    const intersects = click.raycastIntersect(event);
    if (intersects.length > 0) {
        // Either that object or the one behind it
        const focusedObject = intersects[0].object;
        if(focusedObject.tooltip){
            document.getElementById("tooltip").textContent = focusedObject.tooltip;
            document.getElementById("tooltip").style.display = "unset";
        }
        else document.getElementById("tooltip").style.display = "none";
    }
    else document.getElementById("tooltip").style.display = "none";
}

export let raise_head = -.2, turn_head = 0;

// Update the camera based on the mouse position
export function updateCamera() {
    // Adjust the camera's position based on the mouse's position
    // For some reason, these are swapped?
    main.camera.rotation.y =  THREE.MathUtils.lerp(main.camera.rotation.y, mouse.x + turn_head, .07);
    main.camera.rotation.x =  THREE.MathUtils.lerp(main.camera.rotation.x, mouse.y + raise_head*Math.sin((main.camera.rotation.y)*.5)*0.25 , .1);
    // TODO: Generalize this to any object that can be picked up.
    if (main.loaded){
        if (main.mug.hand){
            // main.mug.position.y =  mouse.x;
            main.mug.position.x = -mouse.x*1.3; 
            main.mug.rotation.y = mouse.x*0.8+90;
    
        }
    }
}

// Radians...
function turnLeft(event){
    turn_head += 0.785398;
}
function turnRight(event){
    turn_head -= 0.785398;
}
document.getElementById("left_turn").addEventListener("click", turnLeft);
document.getElementById("right_turn").addEventListener("click", turnRight);
