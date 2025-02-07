import * as THREE from 'three';
import * as main from './main.js';
import * as click from "./clicking.js";

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
    mouse.y = (-(event.clientY / window.innerHeight)+.5)/4;
    document.getElementById("tooltip").style.left = (event.clientX + 10)+"px";
    document.getElementById("tooltip").style.top = (event.clientY + 5)+"px";
    const intersects = click.raycastIntersect(event);
    if (intersects.length > 0) {
        // Either that object or the one behind it
        const focusedObject = intersects[0].object;
        if(intersects[0].distance < 20 && focusedObject.tooltip){
            document.getElementById("tooltip").textContent = focusedObject.tooltip;
            document.getElementById("tooltip").style.display = "unset";
        }
        else document.getElementById("tooltip").style.display = "none";
    }
    else document.getElementById("tooltip").style.display = "none";
}

export let raise_head = -.1, turn_head = 0;

const target_vec = new THREE.Vector3(0, 6, 5);

// Update the camera based on the mouse position
export function updateCamera() {
    const targetQuaternion = new THREE.Quaternion();
    const targetEuler = new THREE.Euler(
        Math.sin(mouse.y) + raise_head,
        mouse.x + turn_head,
        0,
        'YXZ'
    );
    
    main.camera.position.lerp(target_vec, .1);
    targetQuaternion.setFromEuler(targetEuler);
    main.camera.quaternion.slerp(targetQuaternion, 0.1);
    
    let mug = main.scene.getObjectByName("Mug");
    if (mug?.hand) {
        mug.position.x = main.camera.rotation.y*10;
        mug.rotation.y = mouse.x * 0.8 + 90;
    }
}

// Radians...
function turnLeft(event){
    turn_head += 1.57079632679;
}
function turnRight(event){
    turn_head -= 1.57079632679;
}
document.getElementById("left_turn").addEventListener("click", turnLeft);
document.getElementById("right_turn").addEventListener("click", turnRight);


let intervalId = null;

function clickAndHoldStart(event) {
    intervalId = setInterval(function() {
        goForward(event);
        console.log('Holding...');
    }, 100);
}

function clickAndHoldStop(event) {
    clearInterval(intervalId);
    intervalId = null;
}

// Attach the event listeners to the element
document.getElementById("goForward").addEventListener('mousedown', clickAndHoldStart);
document.getElementById("goForward").addEventListener('mouseup', clickAndHoldStop);
document.getElementById("goForward").addEventListener('mouseout', clickAndHoldStop);


function goForward(event){

    const intersects = click.raycastIntersectFromCenter(event);
    // console.log(main.camera.rotation);
    if (intersects[0]?.distance > 7){
            const prevpos = main.camera.position;
            target_vec.set(-3*Math.round(Math.sin(turn_head)) + prevpos.x,
                0 + prevpos.y,
                -3*Math.round(Math.cos(turn_head)) + prevpos.z);
    }
}
