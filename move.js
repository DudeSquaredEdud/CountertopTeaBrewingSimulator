import * as cam from "./camera.js";
import * as THREE from 'three';
import * as click from "./clicking.js";
import * as main from './main.js';

let isGrounded = false; // Track if player is on the ground
const GRAVITY = -150; // Gravity force
const JUMP_FORCE = 30 * 100; // Jump force
let verticalVelocity = 0; // Vertical movement

const probes = [
    new THREE.Vector3(.5, -4, 0),   // Right probe
    new THREE.Vector3(-.5, -4, 0),  // Left probe
    new THREE.Vector3(0, -2, 0),   // Center probe
    new THREE.Vector3(0, -4, -.5),   // Forward probe
];

export let speedfactor = 200;

const keyState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false
};

const onKeyDown = function ( event ) {

    event.preventDefault();
    // console.log(event.code);
    switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            keyState.forward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            keyState.left = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            keyState.backward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            keyState.right = true;
            break;

        case 'ShiftLeft':
            speedfactor = 400;
            main.camera.setFocalLength(15);
        break;
        case 'KeyC':
            main.camera.setFocalLength(80);
        break;
        case "KeyP":
            main.camera.position.set(0,6.5,5.4);
    }

};

const onKeyUp = function ( event ) {

    event.preventDefault();
    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            keyState.forward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            keyState.left = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            keyState.backward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            keyState.right = false;
            break;

        case 'ShiftLeft':
            speedfactor = 200;
            main.camera.setFocalLength(18);
        break;
        case 'KeyC':
            if (speedfactor == 400)
                main.camera.setFocalLength(15);
            else 
            main.camera.setFocalLength(18);

        break;

    }

};


document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );


let velocity = new THREE.Vector3();
let controls;
setTimeout(() => {
    controls = cam.controls;
    console.log(controls);
}, 500)

let prevTime = performance.now();


function checkGrounded() {
    const groundRay = new THREE.Raycaster(
        main.camera.position, // Start at camera
        new THREE.Vector3(0, -1, 0), // Point downward
        0, // Near
        6.5 // Distance to ground
    );

    const intersects = groundRay.intersectObjects(main.scene.children, true);
    isGrounded = intersects.some(intersect => intersect.object.isGround);
}

let jumpRequested = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && isGrounded) {
        jumpRequested = true;
    }
});

export function move(){
    let time = performance.now();
    if (cam.controls?.isLocked == true){
        const delta = ( time - prevTime )/1000;

        // ======== GROUND DETECTION ========
        checkGrounded();
        
        // ======== GRAVITY & JUMPING ========
        if (isGrounded) {
            verticalVelocity = verticalVelocity > 0 ? verticalVelocity : 0;
            if (jumpRequested) {
                verticalVelocity = JUMP_FORCE * delta;
                jumpRequested = false;
            }
        } else {
            verticalVelocity += GRAVITY * delta; // Apply gravity
        }

        // ======== DIRECTION CALCULATION ========
        const cameraForward = new THREE.Vector3();
        main.camera.getWorldDirection(cameraForward);
        cameraForward.y = 0;
        cameraForward.normalize();
        
        const cameraRight = new THREE.Vector3();
        cameraRight.crossVectors(main.camera.up, cameraForward).normalize();
        
        // ======== VELOCITY RESET ========
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        
        // ======== INPUT HANDLING ========
        const inputVector = new THREE.Vector3();
        if(keyState.forward) inputVector.add(cameraForward);
        if(keyState.backward) inputVector.sub(cameraForward);
        if(keyState.left) inputVector.sub(cameraRight);
        if(keyState.right) inputVector.add(cameraRight);
        inputVector.normalize();
        
        // ======== COLLISION DETECTION ========
        const speed = speedfactor * delta;
        const intendedMove = inputVector.clone().multiplyScalar(speed);

        probes.forEach(offset => {
            const rayOrigin = main.camera.position.clone().add(offset);
            const ray = new THREE.Raycaster(
                rayOrigin,
                intendedMove.clone().normalize(),
                0,
                intendedMove.length() + 0.5
            );
            
            const intersects = ray.intersectObjects(main.scene.children, true);
            intersects.forEach(intersect => {
                if(intersect.object.isGround){
                    cam.controls.getObject().position.y += (cam.controls.getObject().position.y - intersect.point.y)*delta;
                }
                if(intersect.object.isWall) {
                    const safeDistance = intersect.distance - 1;
                    if(safeDistance < intendedMove.length()) {
                        const clampRatio = Math.max(safeDistance / intendedMove.length(), 0);
                        intendedMove.multiplyScalar(clampRatio);
                    }
                }
            });
        });

        // ======== VELOCITY APPLICATION ========
        if(intendedMove.length() > 0) {
            // Transform intendedMove into camera-relative space
            const moveX = intendedMove.dot(cameraRight);    // Right/Left
            const moveZ = intendedMove.dot(cameraForward);  // Forward/Back
            
            velocity.x += moveX;
            velocity.z += moveZ;
        }

        // ======== POST-MOVEMENT CORRECTION ========
        const correctionRay = new THREE.Raycaster(
            main.camera.position,
            velocity.clone().normalize(),
            0,
            velocity.length() * delta + 0.5
        );

        correctionRay.intersectObjects(main.scene.children, true).forEach(intersect => {
            if(intersect.object.isWall) {
                const pushForce = intersect.face.normal.clone()
                    .multiplyScalar(1+0.1 + (intersect.object.pushBack || 0));
                pushForce.y = 0;
                velocity.add(pushForce);
            }
        });

        // ======== FINAL MOVEMENT ========
        // Apply horizontal movement
        cam.controls.moveRight(velocity.x * delta);
        cam.controls.moveForward(velocity.z * delta);
        
        // Apply vertical movement
        cam.controls.getObject().position.y += verticalVelocity * delta;
    }
    prevTime = time;
}